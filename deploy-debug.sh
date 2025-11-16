#!/bin/bash

# Debug Deployment Script

set -ex  # Exit on error and print commands

echo "🔍 Debug Deployment"
echo "==================="

# Load configuration
source ./deploy-config.sh

echo "✅ Config loaded"
echo "Sheet ID: ${GOOGLE_SHEET_ID:0:20}..."
echo "Credentials length: ${#GOOGLE_CREDENTIALS}"

# Clean up
rm -rf .aws-sam

# Install dependencies
cd lambda && npm install && cd ..
npm install

# Build
npm run build
sam build

# Deploy
sam deploy \
    --stack-name bayon-coagent-landing \
    --parameter-overrides \
        GoogleSheetId="$GOOGLE_SHEET_ID" \
        GoogleCredentials="$GOOGLE_CREDENTIALS" \
    --capabilities CAPABILITY_IAM \
    --resolve-s3 \
    --region us-east-1 \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset \
    --debug

echo "✅ Deployment complete"
