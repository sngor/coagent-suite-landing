# Bayon Coagent Landing Page - Project Summary

## Overview

A production-ready waitlist landing page with Google Sheets integration for real-time lead tracking.

## What's Deployed

### Frontend
- **URL**: CloudFront distribution
- **Hosting**: S3 bucket
- **Framework**: React + Vite
- **Features**: Animated UI, responsive design, email capture form

### Backend
- **API**: AWS API Gateway + Lambda
- **Lead Storage**: 
  - Primary: Google Sheets (real-time)
  - Backup: S3 (CSV format)
- **Integration**: Google Sheets API via service account

### Infrastructure
- **Stack Name**: `bayon-coagent-landing`
- **Region**: us-east-1
- **IaC**: AWS SAM (CloudFormation)

## Key Files

### Deployment
- `final-deploy.sh` - Main deployment script
- `deploy-config.sh` - Google Sheets credentials (gitignored)
- `template.yaml` - AWS infrastructure definition

### Application
- `src/App.jsx` - Main React component
- `src/App.css` - Styles and animations
- `lambda/collectLead.js` - Lead collection Lambda with Google Sheets

### Documentation
- `README.md` - Project overview
- `DEPLOYMENT-GUIDE.md` - Detailed deployment instructions
- `QUICK-START.md` - Fast deployment guide
- `PROJECT-SUMMARY.md` - This file

## Architecture

```
User Browser
    ↓
CloudFront CDN
    ↓
S3 Static Website
    ↓
API Gateway
    ↓
Lambda Function
    ↓
    ├─→ Google Sheets (primary)
    └─→ S3 Bucket (backup)
```

## Environment Variables

### Lambda Environment
- `LEADS_BUCKET` - S3 bucket for backup storage
- `GOOGLE_SHEET_ID` - Target Google Sheet ID
- `GOOGLE_CREDENTIALS` - Service account JSON credentials

### Frontend Build
- `VITE_API_ENDPOINT` - API Gateway endpoint URL

## Security

### Protected Files (in .gitignore)
- `deploy-config.sh` - Contains Google credentials
- `*credentials*.json` - Service account keys
- `.env.production` - API endpoint configuration

### AWS Permissions
- Lambda has S3 write permissions
- S3 bucket has public read policy
- CloudFront has S3 access

### Google Sheets
- Service account with Editor permissions
- Credentials stored as Lambda environment variable

## Monitoring

### CloudWatch Logs
```bash
aws logs tail /aws/lambda/bayon-coagent-landing-CollectLeadFunction --follow
```

### Google Sheets
- Real-time lead tracking
- Direct access for viewing/exporting

### S3 Backup
```bash
aws s3 cp s3://coagent-leads-ACCOUNT-ID/leads.csv ./leads.csv
```

## Maintenance

### Update Content
1. Edit `src/App.jsx`
2. Run `npm run build`
3. Run `./final-deploy.sh`

### Update Credentials
1. Generate new service account key
2. Update `deploy-config.sh`
3. Run `./final-deploy.sh`

### View Logs
```bash
# Lambda logs
aws logs tail /aws/lambda/bayon-coagent-landing-CollectLeadFunction --follow

# CloudFormation events
aws cloudformation describe-stack-events --stack-name bayon-coagent-landing
```

### Redeploy
```bash
./final-deploy.sh
```

## Cost Breakdown

Monthly costs (estimated):
- **S3 Storage**: $0.50
- **CloudFront**: Free tier (1TB)
- **Lambda**: Free tier (1M requests)
- **API Gateway**: Free tier (1M requests)
- **Total**: ~$1-3/month

## Support

- **Email**: contact@bayoncoagent.com
- **Documentation**: See README.md and DEPLOYMENT-GUIDE.md
- **AWS Console**: CloudFormation stack `bayon-coagent-landing`

## Next Steps

1. ✅ Deployed and working
2. Monitor Google Sheet for leads
3. Customize content as needed
4. Set up custom domain (optional)
5. Configure email notifications (optional)

## Backup & Recovery

### Backup Leads
```bash
# From Google Sheets: File > Download > CSV
# From S3:
aws s3 cp s3://coagent-leads-ACCOUNT-ID/leads.csv ./backup-$(date +%Y%m%d).csv
```

### Restore Stack
```bash
./final-deploy.sh
```

### Delete Stack
```bash
aws cloudformation delete-stack --stack-name bayon-coagent-landing
# Manually delete S3 buckets if needed
```

## Version Info

- **React**: 18.x
- **Vite**: 5.x
- **Node.js**: 20.x
- **AWS SAM**: Latest
- **Google Sheets API**: v4

---

**Last Updated**: $(date)
**Status**: ✅ Production Ready
