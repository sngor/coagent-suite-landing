# Bayon Coagent Landing Page

A modern, high-converting waitlist landing page for Bayon Coagent - an AI-powered platform for real estate agents. Built with React, Vite, and AWS serverless architecture with Google Sheets integration.

## Features

- 🎨 Modern, animated UI with gradient effects and smooth transitions
- 📧 Email collection with AWS Lambda backend
- 📊 Google Sheets integration for real-time lead tracking
- 🚀 Deployed on AWS (S3, CloudFront, API Gateway, Lambda)
- 📱 Fully responsive design
- ⚡ Fast loading with Vite
- 💾 Dual storage: Google Sheets + S3 backup

## Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3 with animations

**Backend:**
- AWS Lambda (Node.js)
- AWS API Gateway
- AWS S3 (storage & hosting)
- AWS CloudFront (CDN)
- AWS SAM (Infrastructure as Code)
- Google Sheets API (lead tracking)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server (React + API)
./start-local.sh

# Or manually start both servers
node local-api.js  # Terminal 1
npm run dev        # Terminal 2
```

Visit http://localhost:5173

### Deploy to AWS

```bash
# Automated deployment with Google Sheets
./final-deploy.sh
```

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.

## Project Structure

```
bayon-coagent-landing/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Styles and animations
│   └── main.jsx             # Entry point
├── lambda/
│   ├── collectLead.js       # Lambda with Google Sheets integration
│   └── package.json         # Lambda dependencies (googleapis)
├── template.yaml            # AWS SAM template
├── final-deploy.sh          # Automated deployment script
├── deploy-config.sh         # Google Sheets credentials (gitignored)
└── DEPLOYMENT-GUIDE.md      # Detailed deployment instructions
```

## Documentation

- **[Deployment Guide](DEPLOYMENT-GUIDE.md)** - Complete deployment instructions with Google Sheets setup

## Key Features

### Waitlist Landing Page
- Hero section with email capture form
- Feature showcase with interactive modals
- Agent testimonials
- FAQ section
- Call-to-action sections

### Lead Collection
- Serverless API with AWS Lambda
- Real-time sync to Google Sheets
- S3 backup as CSV
- Email validation
- Success/error feedback

### UI/UX
- Parallax scrolling effects
- Smooth animations and transitions
- Interactive hover states
- Gradient backgrounds with animated orbs
- Custom cursor glow effect
- Responsive design for all devices

## Environment Variables

Create `.env.local` for local development:
```env
VITE_API_ENDPOINT=http://localhost:3001/api/collect-lead
```

Production uses AWS API Gateway endpoint (auto-configured by deploy script).

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
./final-deploy.sh    # Deploy to AWS with Google Sheets
```

## Managing Leads

### Google Sheets (Primary)
Leads are automatically sent to your Google Sheet in real-time:
- Column A: Email
- Column B: Timestamp

Access your sheet directly to view, export, or analyze leads.

### S3 Backup
Leads are also stored in S3 as `leads.csv`:
```bash
aws s3 cp s3://coagent-leads-YOUR-ACCOUNT-ID/leads.csv ./leads.csv
```

## Customization

### Update Content
Edit `src/App.jsx` to modify:
- Hero text and messaging
- Features and descriptions
- Testimonials
- FAQ items
- Call-to-action text

### Update Styles
Edit `src/App.css` to customize:
- Colors and gradients
- Animations and transitions
- Layout and spacing
- Typography

### Update Legal Pages
Edit `src/PrivacyPolicy.jsx` and `src/TermsOfService.jsx`

## AWS Resources Created

- S3 Bucket (website hosting)
- S3 Bucket (leads storage)
- Lambda Function (lead collection)
- API Gateway (REST API)
- CloudFront Distribution (CDN)

## Costs

Estimated monthly costs for low-medium traffic:
- S3: < $1
- CloudFront: Free tier (1TB)
- Lambda: Free tier (1M requests)
- API Gateway: Free tier (1M requests)
- **Total: < $2/month**

## Security

- HTTPS via CloudFront
- CORS configured for API
- Email validation
- Environment variables for sensitive data
- AWS IAM roles with least privilege

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved

## Support

For issues or questions, contact: contact@bayoncoagent.com
