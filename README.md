kk
# ddai-api-reports

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

**dedoAI** - Reports API Service

---

## Overview

The `ddai-api-reports` service is an AWS Lambda function dockerized to expose a set of reporting APIs used by the dedoAI platform. It provides useful report-related data to the platform portal, offering easy integration and scalability through the serverless architecture.

---

## Features

- **Report Data Retrieval**: Retrieve pre-defined reports for the platform.
- **Error Handling**: Structured error handling through custom error classes.
- **PostgreSQL Integration**: Connects to a PostgreSQL database to fetch and aggregate report data.
- **Secrets Management**: Uses AWS Secrets Manager to securely manage database credentials.
- **Scalable**: Dockerized Lambda for easy deployment and scaling.

---

## Technologies

- **Node.js**: The core backend logic is written in Node.js.
- **AWS Lambda**: Serverless compute service used to handle API requests.
- **Docker**: The Lambda function is containerized for easy deployment.
- **PostgreSQL**: The service connects to a PostgreSQL database to retrieve data.
- **AWS Secrets Manager**: Used for securely managing database credentials.

---

## Getting Started

### Prerequisites

Before setting up the service, ensure you have the following tools installed:

- **Node.js** (version 14.x or higher)
- **AWS CLI**: To interact with AWS services.
- **Docker**: Required for packaging and testing the Lambda function locally.

### Setup

1. Clone this repository:

    ```bash
    git clone https://github.com/dedoAI/ddai-api-reports.git
    cd ddai-api-reports
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up AWS credentials:

    ```bash
    aws configure
    ```

4. Build and package the Lambda function using Docker:

    ```bash
    docker build -t ddai-api-reports .
    ```

---

## API Endpoints

The following APIs are exposed by this service:

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/reports`             | Fetch report data        |

### Example Request

```bash
curl -X GET "https://your-api-endpoint/reports?name=report_name"
```

### Query Parameters

- `name`: The name of the report to fetch (required).
- `offset`: (Optional) Pagination offset.
- `limit`: (Optional) Pagination limit (default is 20).

---

## Error Handling

The service uses a custom `ApplicationError` class to handle errors and provide appropriate HTTP status codes and messages. If an input validation error occurs, the API will return a `400 Bad Request` with details about the validation issue.

---

## Deployment

To deploy the service to AWS, you can use Docker to package the Lambda function and deploy it manually or using AWS tools like CloudFormation.

1. Build the Docker image:

    ```bash
    docker build -t ddai-api-reports .
    ```

2. Push the image to an AWS ECR repository:

    ```bash
    docker tag ddai-api-reports:latest 123456789012.dkr.ecr.region.amazonaws.com/ddai-api-reports:latest
    docker push 123456789012.dkr.ecr.region.amazonaws.com/ddai-api-reports:latest
    ```

3. Deploy the Lambda function (make sure to update the `template.yaml` with correct settings).

---

## Configuration

### AWS Secrets Manager

This service retrieves the PostgreSQL database password from AWS Secrets Manager using the `getDbSecretPwd` function defined in `utils.js`. Ensure you have set up the necessary secrets in AWS and have the correct secret ID in your environment variables.

---

## Testing

To test the service locally:

1. Start the Docker container locally:

    ```bash
    docker run -p 3000:3000 ddai-api-reports
    ```

2. Run the tests:

    ```bash
    npm test
    ```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For further information or support, please reach out to the **dedoAI** team:

- **Email**: support@dedo.org
- **Website**: [dedo.org](https://www.dedo.org)
