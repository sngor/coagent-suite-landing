#!/bin/bash

set -e

echo "📥 Downloading leads from S3..."

LEADS_BUCKET=$(aws cloudformation describe-stacks \
  --stack-name coagent-suite-landing \
  --query "Stacks[0].Outputs[?OutputKey=='LeadsBucketName'].OutputValue" \
  --output text)

if [ -z "$LEADS_BUCKET" ]; then
  echo "❌ Could not find leads bucket"
  exit 1
fi

FILENAME="leads-$(date +%Y%m%d-%H%M%S).csv"

aws s3 cp s3://$LEADS_BUCKET/leads.csv ./$FILENAME

if [ -f "$FILENAME" ]; then
  echo "✅ Downloaded to: $FILENAME"
  echo ""
  echo "📊 Lead count:"
  tail -n +2 $FILENAME | wc -l
else
  echo "❌ No leads file found yet"
fi
