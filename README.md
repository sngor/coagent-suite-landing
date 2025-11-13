# CoAgent Suite Landing Page

A modern, high-converting waitlist landing page for CoAgent Suite - an AI-powered platform for real estate agents. Built with React, Vite, and AWS serverless architecture.

## Features

- 🎨 Modern, animated UI with gradient effects and smooth transitions
- 📧 Email collection with AWS Lambda backend
- 🚀 Deployed on AWS (S3, CloudFront, API Gateway, Lambda)
- 📱 Fully responsive design
- ⚡ Fast loading with Vite
- 🔒 Privacy Policy and Terms of Service pages
- 📊 CSV export of collected leads

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
# One-command deployment
./deploy.sh

# Or manual deployment
sam deploy --guided
npm run build
aws s3 sync dist/ s3://YOUR-BUCKET-NAME/
```

## Project Structure

```
coagent-suite-landing/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Styles and animations
│   ├── main.jsx             # Entry point with routing
│   ├── PrivacyPolicy.jsx    # Privacy policy page
│   ├── TermsOfService.jsx   # Terms of service page
│   └── Legal.css            # Legal pages styles
├── lambda/
│   ├── collectLead.js       # Lambda function for lead collection
│   └── package.json         # Lambda dependencies
├── template.yaml            # AWS SAM template
├── deploy.sh                # Automated deployment script
├── start-local.sh           # Local development script
├── download-leads.sh        # Download leads from S3
└── local-api.js             # Local API server for development

```

## Documentation

- **[Local Development Guide](README-LOCAL.md)** - Run the app locally
- **[Deployment Guide](README-DEPLOYMENT.md)** - Deploy to AWS

## Key Features

### Waitlist Landing Page
- Hero section with email capture form
- Feature showcase with interactive modals
- Agent testimonials
- FAQ section
- Call-to-action sections

### Lead Collection
- Serverless API with AWS Lambda
- Stores leads in S3 as CSV
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
./start-local.sh     # Start local dev environment
./deploy.sh          # Deploy to AWS
./download-leads.sh  # Download leads CSV from S3
```

## Managing Leads

Leads are stored in S3 as `leads.csv`:

```csv
Email,Timestamp
"user@example.com","2024-01-15T10:30:00.000Z"
```

Download leads:
```bash
./download-leads.sh
```

Or manually:
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

For issues or questions, contact: contact@coagentsuite.com
