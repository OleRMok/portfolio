# AWS-Native Serverless Portfolio using devops best practices

A production-grade, serverless portfolio website architected to demonstrate functional independence in Cloud Engineering and DevOps methodologies. This project features a multi-tier architecture with a completely automated CI/CD pipeline.

## 🏗️ Architecture Overview
This project follows a decoupled, serverless-first approach to ensure maximum scalability and zero maintenance overhead.

* **Frontend**: Hosted on **AWS S3** and distributed globally via **Amazon CloudFront** using **Origin Access Control (OAC)** for enhanced security.
***Backend**: **Python-based AWS Lambda** function handling real-time data processing.
***Database**: **Amazon DynamoDB** (NoSQL) utilizing atomic increments for visitor tracking.
***API Layer**: **Amazon API Gateway** (HTTP API) providing a managed REST endpoint.



## 🛠️ DevOps & Automation Stack
***Infrastructure as Code (IaC)**: Provisioned 100% of resources using **Terraform**, ensuring environment reproducibility.
***CI/CD Pipeline**: Automated "code-to-cloud" deployments via **GitHub Actions**, including automated S3 syncing and CloudFront cache invalidation.
***Security Architecture**: Implemented **Least-Privilege IAM Roles** and **Role-Based Access Control (RBAC)** for all serverless components.

## 🚀 Key Engineering Highlights
***Cloud Application Refactoring**: Transitioned from a static concept to a functional PaaS model.
***Cost Governance**: Architected to remain entirely within the AWS Free Tier, demonstrating strategic resource allocation.
***Functional Independence**: Managed end-to-end implementation from networking (VPC/Route 53) to backend logic (Python).

---
*Created and maintained by Olebogeng Mokoma – Cloud & DevOps Engineer*.