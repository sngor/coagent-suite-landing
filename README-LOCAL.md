# Local Development Guide

## Quick Start

### Option 1: One Command (Recommended)

```bash
./start-local.sh
```

This starts both the API server and React dev server.

### Option 2: Manual Start

**Terminal 1 - API Server:**
```bash
node local-api.js
```

**Terminal 2 - React App:**
```bash
npm run dev
```

## Access the App

Open your browser to:
- **React App**: http://localhost:5173
- **API Server**: http://localhost:3001

## Testing Lead Collection

1. Open http://localhost:5173
2. Enter an email in the form
3. Click "Get Early Access"
4. Check `leads-local.csv` file for collected leads

## Local Leads File

All leads are saved to `leads-local.csv` in the project root:

```csv
Email,Timestamp
"test@example.com","2024-01-15T10:30:00.000Z"
```

## Development Workflow

1. **Make changes** to `src/App.jsx` or `src/App.css`
2. **Hot reload** automatically updates the browser
3. **Test lead collection** with the local API
4. **View leads** in `leads-local.csv`

## Stopping the Servers

Press `Ctrl+C` in the terminal to stop both servers.

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies not installed:**
```bash
npm install
```

**API not responding:**
- Check if `local-api.js` is running
- Verify `.env.local` has correct endpoint
- Check console for errors

## Environment Files

- `.env.local` - Local development (uses localhost API)
- `.env` - Production (uses AWS API Gateway)

The app automatically uses `.env.local` when running `npm run dev`.
