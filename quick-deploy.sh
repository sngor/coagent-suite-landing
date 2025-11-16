#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "🔨 Building..."
npm run build

echo "📤 Uploading to S3..."
BUCKET=$(aws cloudformation describe-stacks --stack-name bayon-coagent-landing --region us-east-1 --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' --output text)
aws s3 sync dist/ s3://$BUCKET/ --delete

echo "🔄 Invalidating CloudFront..."
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Origins.Items[?DomainName=='$BUCKET.s3.amazonaws.com']].Id" --output text)
if [ -n "$DIST_ID" ]; then
  aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*" > /dev/null
fi

echo "✅ Done! Changes will be live in 1-2 minutes."
