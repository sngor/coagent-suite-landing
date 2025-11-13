#!/bin/bash

set -e

echo "📦 Installing Lambda dependencies..."
cd lambda
npm install
cd ..

echo "📦 Deploying with AWS SAM..."
sam deploy --guided

echo "🔧 Getting API endpoint..."
API_ENDPOINT=$(aws cloudformation describe-stacks --stack-name coagent-suite-landing --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text)

if [ -z "$API_ENDPOINT" ]; then
  echo "⚠️  Could not find API endpoint. Skipping .env creation."
else
  echo "VITE_API_ENDPOINT=$API_ENDPOINT" > .env
  echo "✅ Created .env with API endpoint"
fi

echo "🚀 Building React application..."
npm run build

echo "📤 Syncing files to S3..."
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name coagent-suite-landing --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" --output text)

if [ -z "$BUCKET_NAME" ]; then
  echo "❌ Could not find bucket name from stack outputs"
  exit 1
fi

aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your website URLs:"
aws cloudformation describe-stacks --stack-name coagent-suite-landing --query "Stacks[0].Outputs" --output table

echo ""
echo "📧 To download leads CSV:"
LEADS_BUCKET=$(aws cloudformation describe-stacks --stack-name coagent-suite-landing --query "Stacks[0].Outputs[?OutputKey=='LeadsBucketName'].OutputValue" --output text)
echo "aws s3 cp s3://$LEADS_BUCKET/leads.csv ./leads.csv"
