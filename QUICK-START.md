# Quick Start Guide - Bayon Coagent

Get your landing page deployed in under 10 minutes!

## Prerequisites

- AWS CLI configured
- AWS SAM CLI installed
- Node.js installed
- Google account

## Step 1: Google Sheets Setup (3 minutes)

1. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com
   - Create new project: "Bayon Coagent"
   - Enable "Google Sheets API"

2. **Create Service Account**
   - Go to "IAM & Admin" > "Service Accounts"
   - Create service account: "leads-collector"
   - Download JSON credentials

3. **Create Google Sheet**
   - Create new sheet: "Bayon Coagent Leads"
   - Add headers: "Email" (A1), "Timestamp" (B1)
   - Copy Sheet ID from URL
   - Share with service account email (from JSON)
   - Give "Editor" permissions

## Step 2: Configure Credentials (2 minutes)

1. **Save credentials file** to project directory:
   ```bash
   # Example: coagent-googlesheet.json
   ```

2. **Create `deploy-config.sh`**:
   ```bash
   #!/bin/bash
   export GOOGLE_SHEET_ID="your_sheet_id"
   export GOOGLE_CREDENTIALS='{"type":"service_account",...}'
   ```

   To convert JSON to single line:
   ```bash
   cat coagent-googlesheet.json | jq -c .
   ```

## Step 3: Deploy (5 minutes)

```bash
./final-deploy.sh
```

That's it! The script will:
- ✅ Install dependencies
- ✅ Build frontend
- ✅ Deploy to AWS
- ✅ Configure Google Sheets
- ✅ Set up CloudFront CDN

## Step 4: Test

1. Visit the CloudFront URL from the output
2. Submit a test email
3. Check your Google Sheet - email should appear!

## Troubleshooting

**Access Denied on CloudFront?**
- Wait 5-10 minutes for propagation
- Run `./final-deploy.sh` again

**Emails not in Google Sheet?**
- Verify you shared the sheet with service account email
- Check Lambda logs: `aws logs tail /aws/lambda/bayon-coagent-landing-CollectLeadFunction --follow`

**Need help?**
- See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions
- Contact: contact@bayoncoagent.com

## What's Next?

- Customize content in `src/App.jsx`
- Update styles in `src/App.css`
- Monitor leads in your Google Sheet
- Check CloudWatch logs for analytics

## Cost

Estimated monthly cost: **$1-3** (mostly free tier)
- S3: ~$0.50
- CloudFront: Free (1TB)
- Lambda: Free (1M requests)
- API Gateway: Free (1M requests)
