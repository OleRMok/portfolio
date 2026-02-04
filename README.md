🚀 Cloud & DevOps Portfolio: Olebogeng Mokoma
This repository contains the source code and infrastructure for my professional portfolio, deployed as a highly available, serverless web application on AWS.

🏗️ Architecture Overview
The project is built using a modern DevOps stack to demonstrate cloud-native principles:

Frontend: Built with React and Vite, featuring a responsive design and "white-labeled" metadata.

Infrastructure as Code (IaC): Managed entirely via Terraform, including S3, CloudFront, Lambda, and DynamoDB.

Hosting: Static assets are hosted in Amazon S3 and delivered globally through Amazon CloudFront for low-latency access.

Security: Secured with HTTPS via AWS Certificate Manager (ACM) and Origin Access Control (OAC) to protect S3 assets.

Visitor Counter: A serverless backend using API Gateway, AWS Lambda (Python), and DynamoDB to track unique visits.

🛠️ Key Technical Projects
AWS Infrastructure Migration: Executed a "Lift-and-Shift" migration of on-premises workloads to AWS EC2 and VPC environments.

PaaS Refactoring: Refactored monolithic architectures to Platform-as-a-Service (PaaS) models, utilizing managed cloud services to reduce operational overhead.

Azure Cloud Resume: Architected a fully cloud-native resume system on Azure utilizing static hosting and serverless APIs.

Observability Stack: Implemented a monitoring and observability stack using Prometheus, Grafana, and Loki.

📜 Certifications & Skills
Oracle Cloud Infrastructure 2025 Architect Associate (82%)

Microsoft Certified: DevOps Engineer Expert (86%)

OCI AI Foundations Associate (88%)

Core Skills: Terraform, GitHub Actions, CI/CD, Python, AWS, Azure, OCI, and SQL.

🤖 CI/CD Pipeline
Automated deployments are handled via GitHub Actions:

Build: Compiles the React application and zips the Lambda backend.

Infrastructure: Applies Terraform configurations to maintain environment consistency.

Deployment: Syncs assets to S3 and invalidates the CloudFront cache for instant updates.
