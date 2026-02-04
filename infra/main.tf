# 1. The S3 Bucket (Private)
resource "aws_s3_bucket" "portfolio_bucket" {
  bucket = "olebogeng-portfolio-2026"
}

# 2. CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "portfolio-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# 3. SSL Certificate 
resource "aws_acm_certificate" "cert" {
  domain_name       = "oleportfolio.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# 4. DNS Record for ACM validation
resource "aws_route53_record" "cert_validation" {
  allow_overwrite = true
  name            = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_name
  records         = [tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_value]
  type            = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_type
  zone_id         = "Z06075482NSRXCLC1OBI"
  ttl             = 60
}

# 5. ACM Validation trigger
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}

# 6. The CloudFront Distribution
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = aws_s3_bucket.portfolio_bucket.bucket_regional_domain_name
    origin_id                = "S3-Portfolio"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  default_root_object = "index.html"
  aliases             = ["oleportfolio.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Portfolio"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

# 7. S3 Bucket Policy for CloudFront access
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.portfolio_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "s3:GetObject"
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.portfolio_bucket.arn}/*"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      }
    ]
  })
}

# 8. Route 53 A-Record for the domain
resource "aws_route53_record" "root_domain" {
  zone_id = "Z06075482NSRXCLC1OBI"
  name    = "oleportfolio.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

# 9. DynamoDB for visitor tracking
resource "aws_dynamodb_table" "visitor_count" {
  name         = "portfolio-visitor-count"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "Production"
    Project     = "Portfolio-DevOps"
  }
}

# 10. IAM Role for Lambda
resource "aws_iam_role" "lambda_exec_role" {
  name = "portfolio_lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# 11. IAM Policy for DynamoDB access
resource "aws_iam_role_policy" "lambda_db_policy" {
  name = "lambda_db_access"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:UpdateItem", "dynamodb:GetItem"]
      Resource = aws_dynamodb_table.visitor_count.arn
    }]
  })
}


# NEW: Data source to zip the lambda code from the new backend folder
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/lambda_function.py"
  output_path = "${path.module}/lambda_function_payload.zip"
}

# 12. Lambda Function
resource "aws_lambda_function" "visitor_counter" {
  filename         = data.archive_file.lambda.output_path
  function_name    = "visitor_counter_func"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.9"
  source_code_hash = data.archive_file.lambda.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visitor_count.name
    }
  }
}

# 13. API Gateway
resource "aws_apigatewayv2_api" "visitor_api" {
  name          = "visitor_counter_api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["https://oleportfolio.com", "http://localhost:5173"]
    allow_methods = ["GET"]
  }
}

# 14. API Gateway Integration
resource "aws_apigatewayv2_integration" "lambda_int" {
  api_id           = aws_apigatewayv2_api.visitor_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.visitor_counter.invoke_arn
}

# 15. API Gateway Route
resource "aws_apigatewayv2_route" "count_route" {
  api_id    = aws_apigatewayv2_api.visitor_api.id
  route_key = "GET /count"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_int.id}"
}

# 16. API Gateway Stage
resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.visitor_api.id
  name        = "$default"
  auto_deploy = true
}

# 17. Lambda Permission for API Gateway
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_counter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.visitor_api.execution_arn}/*/*"
}

# 18. API Endpoint output
output "api_url" {
  # This provides the base URL + the specific route created
  value = "${aws_apigatewayv2_api.visitor_api.api_endpoint}/count"
}