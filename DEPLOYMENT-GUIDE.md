# Deployment Guide - Bayon Coagent Landing Page

## Prerequisites
- AWS CLI configured with credentials
- AWS SAM CLI installed
- Node.js installed
- Google Cloud account

## Quick Start (Automated Deployment)

For the fastest deployment, use the automated script:

```bash
./final-deploy.sh
```

This script handles everything automatically. Continue reading for manual setup instructions.

---

## Manual Deployment Steps

### Step 1: Set Up Google Sheets

#### 1.1 Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create a new project (e.g., "Bayon Coagent Leads")
3. Enable the Google Sheets API

#### 1.2 Create Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it "leads-collector"
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

#### 1.3 Generate Credentials
1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

#### 1.4 Create and Share Google Sheet
1. Create a new Google Sheet
2. Name it "Bayon Coagent Leads"
3. Add headers in row 1: "Email" (A1) and "Timestamp" (B1)
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
5. Click "Share" button
6. Share with the service account email (from JSON: `client_email` field)
7. Give "Editor" permissions

### Step 2: Configure Credentials

1. **Save your credentials JSON file** to the project directory:
   ```bash
   # Example: coagent-googlesheet.json
   ```

2. **Create `deploy-config.sh`** in the project root:
   ```bash
   #!/bin/bash
   export GOOGLE_SHEET_ID="your_sheet_id_here"
   export GOOGLE_CREDENTIALS='paste_json_content_here_as_single_line'
   ```

3. **Convert JSON to single line** (if needed):
   ```bash
   cat your-credentials.json | jq -c .
   ```

### Step 3: Deploy

Run the deployment script:
```bash
./final-deploy.sh
```

The script will:
- Install all dependencies
- Build the frontend
- Deploy Lambda functions and API Gateway
- Upload website to S3
- Configure CloudFront CDN
- Set up Google Sheets integration

### Step 4: Verify Deployment

1. Visit the CloudFront URL provided in the output
2. Submit a test email
3. Check your Google Sheet - the email should appear
4. Check S3 bucket for `leads.csv` backup

## Troubleshooting

### Access Denied on CloudFront
- Wait 5-10 minutes for CloudFront to propagate
- Run: `./final-deploy.sh` to redeploy

### Lambda Errors
```bash
# View Lambda logs
aws logs tail /aws/lambda/bayon-coagent-landing-CollectLeadFunction --follow
```

### Google Sheets Not Receiving Data
- Verify the service account email has Editor access to the sheet
- Check the Sheet ID is correct in `deploy-config.sh`
- Ensure credentials JSON is properly formatted (single line, no extra spaces)
- Check Lambda logs for Google API errors

### CORS Errors
- Verify API Gateway CORS is configured in `template.yaml`
- Check browser console for specific error messages
- Ensure Lambda returns proper CORS headers

## Security Notes

1. **Never commit credentials to Git**
   - `deploy-config.sh` is in `.gitignore`
   - `*.json` credential files are in `.gitignore`
   - Never push these files to version control

2. **Rotate Credentials Regularly**
   - Generate new service account keys periodically
   - Update `deploy-config.sh` and redeploy

3. **Production Best Practice**
   - Use AWS Secrets Manager to store Google credentials
   - Use AWS Systems Manager Parameter Store for configuration
   - Enable CloudTrail for audit logging

## Monitoring

- CloudWatch Logs: Monitor Lambda execution
- Google Sheets: Real-time lead tracking
- S3 Bucket: Backup CSV file

## Cost Estimate

- S3: ~$0.50/month
- CloudFront: Free tier (1TB)
- Lambda: Free tier (1M requests)
- API Gateway: Free tier (1M requests)
- **Total: ~$1-3/month**

## Support

For issues, check:
1. CloudWatch Logs for Lambda errors
2. Browser console for frontend errors
3. Google Cloud Console for API quota/errors
