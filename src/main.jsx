import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import TermsOfService from './TermsOfService.jsx'
import './index.css'

function Router() {
  const path = window.location.pathname
  
  if (path === '/privacy') return <PrivacyPolicy />
  if (path === '/terms') return <TermsOfService />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
