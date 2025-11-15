---
title: "AWS Bedrock Integration Patterns with Claude Code"
date: "2025-10-18"
author: "Maria Rodriguez"
excerpt: "Explore different patterns for integrating Claude Code with AWS Bedrock in production applications."
category: "AWS"
tags: ["AWS", "Bedrock", "Integration", "Patterns"]
published: true
---

# AWS Bedrock Integration Patterns with Claude Code

Integrating Claude Code with AWS Bedrock requires careful consideration of architecture patterns. This guide explores proven patterns for production applications.

## Introduction

When building production applications with Claude Code and AWS Bedrock, choosing the right integration pattern is crucial for:

- Performance
- Scalability
- Cost optimization
- Reliability
- Security

## Pattern 1: Direct Integration

The simplest pattern connects directly to Bedrock:

```typescript
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({ region: 'us-east-1' });

async function invokeClaude(prompt: string) {
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-v2',
    body: JSON.stringify({
      prompt,
      max_tokens: 1000
    })
  });

  const response = await client.send(command);
  return response;
}
```

**Pros:**
- Simple implementation
- Low latency
- Direct control

**Cons:**
- No caching
- Limited error handling
- No rate limiting

## Pattern 2: Lambda Proxy Pattern

Route requests through AWS Lambda:

```typescript
// Lambda function
export const handler = async (event) => {
  const { prompt } = JSON.parse(event.body);

  const response = await invokeBedrock(prompt);

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
```

**Benefits:**
- Serverless scaling
- Built-in monitoring
- Cost-effective for variable workloads

## Pattern 3: API Gateway + Lambda + Bedrock

Add API Gateway for additional features:

```
Client → API Gateway → Lambda → Bedrock
```

This pattern provides:
- Rate limiting
- Authentication (API keys, IAM)
- Request validation
- Caching
- Monitoring and logging

## Pattern 4: Queue-Based Asynchronous Processing

For long-running or batch operations:

```
Client → SQS → Lambda → Bedrock → DynamoDB
```

Implementation:

```typescript
// Producer
await sqs.sendMessage({
  QueueUrl: process.env.QUEUE_URL,
  MessageBody: JSON.stringify({
    prompt,
    userId,
    timestamp: Date.now()
  })
});

// Consumer (Lambda)
export const handler = async (event) => {
  for (const record of event.Records) {
    const { prompt, userId } = JSON.parse(record.body);

    const response = await invokeBedrock(prompt);

    await saveToDatabase(userId, response);
  }
};
```

**Use Cases:**
- Batch processing
- Background tasks
- Decoupling components
- Handling traffic spikes

## Pattern 5: Step Functions for Complex Workflows

Orchestrate multi-step AI workflows:

```json
{
  "StartAt": "PreprocessInput",
  "States": {
    "PreprocessInput": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:preprocess",
      "Next": "InvokeBedrock"
    },
    "InvokeBedrock": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:invoke-bedrock",
      "Next": "PostprocessOutput"
    },
    "PostprocessOutput": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:postprocess",
      "End": true
    }
  }
}
```

## Best Practices

### 1. Implement Caching

Use ElastiCache or DynamoDB DAX:

```typescript
async function getCachedResponse(prompt: string) {
  const cached = await cache.get(prompt);
  if (cached) return cached;

  const response = await invokeBedrock(prompt);
  await cache.set(prompt, response, 3600); // 1 hour TTL

  return response;
}
```

### 2. Error Handling and Retries

Implement exponential backoff:

```typescript
async function invokeWithRetry(prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await invokeBedrock(prompt);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

### 3. Cost Optimization

- Cache frequent requests
- Use appropriate model sizes
- Implement request batching
- Monitor token usage
- Set budget alerts

### 4. Security

- Use IAM roles, not access keys
- Encrypt data in transit and at rest
- Implement VPC endpoints
- Enable CloudTrail logging
- Use AWS Secrets Manager

## Monitoring and Observability

Set up comprehensive monitoring:

```typescript
import { CloudWatch } from '@aws-sdk/client-cloudwatch';

async function logMetrics(duration: number, tokens: number) {
  await cloudwatch.putMetricData({
    Namespace: 'BedrockIntegration',
    MetricData: [
      {
        MetricName: 'InvocationDuration',
        Value: duration,
        Unit: 'Milliseconds'
      },
      {
        MetricName: 'TokensUsed',
        Value: tokens,
        Unit: 'Count'
      }
    ]
  });
}
```

## Choosing the Right Pattern

| Pattern | Best For | Complexity |
|---------|----------|------------|
| Direct Integration | Simple apps, prototypes | Low |
| Lambda Proxy | Serverless apps | Medium |
| API Gateway | Public APIs, rate limiting | Medium |
| Queue-Based | Batch processing, async | High |
| Step Functions | Complex workflows | High |

## Conclusion

Selecting the right integration pattern depends on your specific requirements. Start simple and evolve your architecture as needs grow.

Remember:
- Start with direct integration for prototypes
- Add Lambda for serverless benefits
- Use queues for async processing
- Implement Step Functions for complex workflows

With these patterns in your toolkit, you're ready to build robust, scalable applications with Claude Code and AWS Bedrock.
