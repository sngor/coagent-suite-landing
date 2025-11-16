#!/bin/bash

# Final Deployment Script - Fixed for S3 ACL issues

set -e

# Load NVM if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "🚀 Final Deployment - Bayon Coagent"
echo "===================================="
echo ""

# Load configuration
source ./deploy-config.sh

# Clean up
echo "🧹 Cleaning up..."
rm -rf .aws-sam

# Install dependencies
echo "📦 Installing dependencies..."
cd lambda && npm install && cd ..
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Build SAM
echo "🔨 Building SAM..."
sam build

# Deploy stack
echo "☁️  Deploying stack to AWS..."
sam deploy \
    --stack-name bayon-coagent-landing \
    --parameter-overrides \
        GoogleSheetId="$GOOGLE_SHEET_ID" \
        GoogleCredentials="$GOOGLE_CREDENTIALS" \
    --capabilities CAPABILITY_IAM \
    --resolve-s3 \
    --region us-east-1 \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset

echo ""
echo "⏳ Waiting for stack to complete..."
sleep 10

# Get outputs
echo "📊 Getting deployment information..."
API_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name bayon-coagent-landing \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
    --output text)

BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name bayon-coagent-landing \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text)

CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name bayon-coagent-landing \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
    --output text)

echo "✅ Stack deployed"
echo ""

# Update frontend with API endpoint
echo "🔧 Updating frontend with API endpoint..."
echo "VITE_API_ENDPOINT=$API_ENDPOINT" > .env.production

# Rebuild frontend
echo "🔨 Rebuilding frontend..."
npm run build

# Upload to S3 without ACL
echo "📤 Uploading website to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

# Invalidate CloudFront
echo "🔄 Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[?DomainName=='$BUCKET_NAME.s3.amazonaws.com']].Id" \
    --output text)

if [ -n "$DISTRIBUTION_ID" ]; then
    aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" > /dev/null
    echo "✅ CloudFront cache invalidated"
fi

echo ""
echo "✅ Deployment Complete!"
echo "======================="
echo ""
echo "🌐 Website URL: https://$CLOUDFRONT_URL"
echo "🔗 API Endpoint: $API_ENDPOINT"
echo "📦 S3 Bucket: $BUCKET_NAME"
echo "📊 Google Sheet: https://docs.google.com/spreadsheets/d/$GOOGLE_SHEET_ID"
echo ""
echo "🎉 Your landing page is now live!"
echo ""
echo "⏳ Note: CloudFront may take 5-10 minutes to fully propagate."
echo "   If you see errors, wait a few minutes and refresh."
echo ""
