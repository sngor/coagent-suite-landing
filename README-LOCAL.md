# Local Development Guide

Run the CoAgent Suite landing page locally for development and testing.

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
2. Enter an email in the waitlist form
3. Click "Join the Waitlist"
4. Check `leads-local.csv` file in project root for collected emails

Example `leads-local.csv`:
```csv
Email,Timestamp
"test@example.com","2024-01-15T10:30:00.000Z"
"another@example.com","2024-01-15T11:45:00.000Z"
```

## Local Leads File

All leads are saved to `leads-local.csv` in the project root:

```csv
Email,Timestamp
"test@example.com","2024-01-15T10:30:00.000Z"
```

## Development Workflow

1. **Edit content** in `src/App.jsx` (text, features, testimonials, FAQ)
2. **Update styles** in `src/App.css` (colors, animations, layout)
3. **Hot reload** automatically updates the browser
4. **Test lead collection** by submitting the form
5. **View collected leads** in `leads-local.csv`

### Making Changes

**Update hero text:**
```jsx
// src/App.jsx
<h1 className="hero-title">
  Your New Headline Here
</h1>
```

**Change colors:**
```css
/* src/App.css */
.hero-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Add new feature:**
```jsx
// src/App.jsx - features array
{
  id: 'f5',
  icon: '🎯',
  title: 'New Feature',
  summary: 'Feature description',
  details: ['Detail 1', 'Detail 2']
}
```

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
