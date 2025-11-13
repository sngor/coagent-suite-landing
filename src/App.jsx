import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const leads = JSON.parse(localStorage.getItem('leads') || '[]')
      leads.push({ email, timestamp: new Date().toISOString() })
      localStorage.setItem('leads', JSON.stringify(leads))
      setMessage('✓ Success! You\'re on the waitlist.')
      setEmail('')
    } catch (error) {
      setMessage('❌ Error. Please try again.')
    } finally {
      setTimeout(() => {
        setLoading(false)
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">CoAgent</div>
        <button className="nav-btn" type="button">Contact</button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-badge">AI-Powered Automation</div>
          <h1 className="hero-title">
            Transform Your<br/>Business with AI
          </h1>
          <p className="hero-subtitle">
            Intelligent agents that automate sales and marketing, working 24/7 to grow your business
          </p>
          <form onSubmit={handleSubmit} className="hero-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="hero-input"
            />
            <button type="submit" disabled={loading} className="hero-btn">
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          {message && <p className="success-msg">{message}</p>}
        </section>

        <section className="products">
          <div className="product-card">
            <div className="product-icon">🎯</div>
            <h3>CoAgent Closer</h3>
            <p>Handles sales conversations, qualifies leads, and closes deals automatically</p>
          </div>
          <div className="product-card">
            <div className="product-icon">📢</div>
            <h3>CoAgent Marketer</h3>
            <p>Creates, optimizes, and manages marketing campaigns across all channels</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
