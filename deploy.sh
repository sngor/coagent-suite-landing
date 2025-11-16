#!/bin/bash
set -e

echo "🔨 Building..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://bayon-coagent-site-409136660268/ --delete

echo "🔄 Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id E1DREDEW1H4QKZ --paths "/*"

echo "✅ Done! Live in 1-2 minutes at https://d3luy0421rtd2c.cloudfront.net"
