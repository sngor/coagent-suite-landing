# CoAgent Suite Landing Page - AWS Deployment

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **AWS SAM CLI** installed
   ```bash
   brew install aws-sam-cli  # macOS
   # or
   pip install aws-sam-cli
   ```

3. **Node.js** and npm installed

## Deployment Steps

### Option 1: Automated Deployment (Recommended)

Run the deployment script:
```bash
./deploy.sh
```

This will:
1. Install Lambda dependencies
2. Deploy the SAM template (creates S3 buckets, Lambda, API Gateway, and CloudFront)
3. Configure API endpoint in .env file
4. Build the React application
5. Upload the built files to S3
6. Display your website URLs and API endpoint

### Option 2: Manual Deployment

1. **Build the React app:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy the SAM template:**
   ```bash
   sam deploy --guided
   ```
   
   Follow the prompts:
   - Stack Name: `coagent-suite-landing`
   - AWS Region: `us-east-1` (or your preferred region)
   - Confirm changes: `Y`
   - Allow SAM CLI IAM role creation: `Y`
   - Save arguments to configuration file: `Y`

3. **Get the bucket name:**
   ```bash
   aws cloudformation describe-stacks \
     --stack-name coagent-suite-landing \
     --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
     --output text
   ```

4. **Upload files to S3:**
   ```bash
   aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete
   ```

## Accessing Your Website

After deployment, you'll get:

1. **S3 Website URL** - Direct S3 hosting (HTTP only)
2. **CloudFront URL** - CDN with HTTPS support (recommended)
3. **API Endpoint** - For lead collection
4. **Leads Bucket** - S3 bucket storing leads.csv

View outputs:
```bash
aws cloudformation describe-stacks \
  --stack-name coagent-suite-landing \
  --query "Stacks[0].Outputs" \
  --output table
```

## Managing Leads

### Download Leads CSV

Use the provided script:
```bash
./download-leads.sh
```

Or manually:
```bash
aws s3 cp s3://coagent-leads-YOUR-ACCOUNT-ID/leads.csv ./leads.csv
```

### CSV Format

The leads.csv file contains:
```csv
Email,Timestamp
"user@example.com","2024-01-15T10:30:00.000Z"
"another@example.com","2024-01-15T11:45:00.000Z"
```

### Automate Lead Processing

You can set up automation to:

1. **Download leads periodically:**
   ```bash
   # Add to crontab for daily download at 9 AM
   0 9 * * * /path/to/download-leads.sh
   ```

2. **Import to CRM:**
   ```bash
   # Example: Import to your CRM via API
   python import_to_crm.py leads.csv
   ```

3. **Email notifications:**
   Set up S3 event notification to trigger Lambda when leads.csv is updated

## Updating the Website

To update your website after making changes:

```bash
npm run build
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/ --delete

# Invalidate CloudFront cache (optional, for immediate updates)
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --stack-name coagent-suite-landing \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" \
  --output text | cut -d'.' -f1)

aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

## Custom Domain (Optional)

To use a custom domain:

1. Register domain in Route 53 or use existing domain
2. Request SSL certificate in ACM (us-east-1 region for CloudFront)
3. Update `template.yaml` to add:
   ```yaml
   CloudFrontDistribution:
     Properties:
       DistributionConfig:
         Aliases:
           - yourdomain.com
           - www.yourdomain.com
         ViewerCertificate:
           AcmCertificateArn: arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT-ID
           SslSupportMethod: sni-only
   ```
4. Redeploy: `sam deploy`
5. Create Route 53 A record pointing to CloudFront distribution

## Cleanup

To delete all resources:
```bash
# Empty the S3 bucket first
aws s3 rm s3://YOUR-BUCKET-NAME/ --recursive

# Delete the CloudFormation stack
sam delete --stack-name coagent-suite-landing
```

## Costs

- **S3**: ~$0.023 per GB stored + $0.09 per GB transferred
- **CloudFront**: First 1TB/month free, then ~$0.085 per GB
- **Lambda**: 1M requests/month free, then $0.20 per 1M requests
- **API Gateway**: 1M requests/month free, then $3.50 per 1M requests
- **Typical landing page with lead collection**: < $2/month for low-medium traffic

## Troubleshooting

**Issue**: "Bucket already exists"
- Solution: Change bucket name in `template.yaml` or delete existing bucket

**Issue**: CloudFront takes 15-20 minutes to deploy
- Solution: This is normal for CloudFront distributions

**Issue**: Changes not showing
- Solution: Invalidate CloudFront cache or wait 24 hours for TTL expiration
