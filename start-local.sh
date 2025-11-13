#!/bin/bash

echo "🚀 Starting CoAgent Suite locally..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

echo "🔧 Starting local API server..."
node local-api.js &
API_PID=$!

sleep 2

echo "🌐 Starting React dev server..."
npm run dev

# Cleanup on exit
trap "kill $API_PID 2>/dev/null" EXIT
