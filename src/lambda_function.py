import json
import boto3
import os

# Best Practice: Initialize clients outside the handler for 'Warm Starts'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('portfolio-visitor-count')

def lambda_handler(event, context):
    try:
        # Atomic Increment: Prevents race conditions (Junior vs. Senior distinction)
        response = table.update_item(
            Key={'id': 'visitors'},
            UpdateExpression='ADD #c :val',
            ExpressionAttributeNames={'#c': 'count'},
            ExpressionAttributeValues={':val': 1},
            ReturnValues='UPDATED_NEW'
        )
        
        count = response['Attributes']['count']

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*', # Enabling CORS for frontend integration
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'count': int(count)})
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'Internal Server Error'})}