import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState(null)
  const [modalFeature, setModalFeature] = useState(null)

  const features = [
    {
      id: 'f1',
      icon: '🏠',
      title: 'Buyer & Seller Lead Generation',
      summary: 'AI finds motivated buyers and sellers in your target market 24/7',
      details: [
        'Automated prospecting from Zillow, Realtor.com, and social media',
        'Identifies FSBOs, expired listings, and pre-foreclosures',
        'Geo-targeted campaigns for your farm areas',
        'Instant response to new listing inquiries and open house sign-ups'
      ]
    },
    {
      id: 'f2',
      icon: '💬',
      title: 'Smart Client Conversations',
      summary: 'Engages prospects with personalized responses about listings and market info',
      details: [
        'Answers property questions and schedules showings instantly',
        'Provides neighborhood insights and school information',
        'Sends automated market updates and new listing alerts',
        'Seamlessly transfers hot leads to you for personal follow-up'
      ]
    },
    {
      id: 'f3',
      icon: '🔥',
      title: 'Lead Qualification & Nurturing',
      summary: 'Automatically identifies serious buyers and motivated sellers',
      details: [
        'Pre-qualifies buyers based on budget, timeline, and preferences',
        'Scores seller motivation and property readiness',
        'Drip campaigns for long-term lead nurturing',
        'Syncs with your CRM and MLS for seamless workflow'
      ]
    },
    {
      id: 'f4',
      icon: '✅',
      title: 'Transaction Management',
      summary: 'Automates follow-ups and keeps deals moving to closing',
      details: [
        'Automated appointment reminders and showing confirmations',
        'Follow-up sequences after showings and open houses',
        'Transaction milestone tracking and client updates',
        'Post-closing referral requests and review generation'
      ]
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalFeature) {
        setModalFeature(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [modalFeature])

  const scrollToForm = () => {
    document.querySelector('.hero-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => document.querySelector('.hero-input')?.focus(), 500)
  }

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
      <div className="bg-gradient-orb orb-1"></div>
      <div className="bg-gradient-orb orb-2"></div>
      <div className="bg-gradient-orb orb-3"></div>
      <div className="bg-grid"></div>
      <div className="cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />
      
      <nav className="nav">
        <div className="logo">
          <span className="logo-text">CoAgent Suite</span>
          <span className="logo-pulse"></span>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-badge">✨ AI for Real Estate Agents</div>
          <h1 className="hero-title">
            Your AI Assistant That Generates Leads & Closes Deals While You Sleep
          </h1>
          <p className="hero-subtitle">
            Automate prospecting, client follow-ups, and transaction management—so you can focus on showings and closings
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
            <button type="submit" disabled={loading} className={`hero-btn ${loading ? 'loading' : ''}`}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Joining...
                </>
              ) : 'Get Early Access'}
            </button>
          </form>
          {message && <p className="success-msg">{message}</p>}
          <div className="hero-stats">
            <div className="stat" onMouseEnter={() => setActiveCard('stat1')} onMouseLeave={() => setActiveCard(null)}>
              <div className={`stat-value ${activeCard === 'stat1' ? 'active' : ''}`}>3x</div>
              <div className="stat-label">More Closings</div>
            </div>
            <div className="stat" onMouseEnter={() => setActiveCard('stat2')} onMouseLeave={() => setActiveCard(null)}>
              <div className={`stat-value ${activeCard === 'stat2' ? 'active' : ''}`}>24/7</div>
              <div className="stat-label">Lead Response</div>
            </div>
            <div className="stat" onMouseEnter={() => setActiveCard('stat3')} onMouseLeave={() => setActiveCard(null)}>
              <div className={`stat-value ${activeCard === 'stat3' ? 'active' : ''}`}>90%</div>
              <div className="stat-label">Time Saved</div>
            </div>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Your Complete Real Estate AI System</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="feature-card"
                onMouseEnter={() => setActiveCard(feature.id)} 
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => setModalFeature(feature)}
              >
                <div className={`feature-icon ${activeCard === feature.id ? 'bounce' : ''}`}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.summary}</p>
                <div className="expand-hint">Click to learn more</div>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <h2 className="section-title">Trusted by Top-Producing Agents</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"CoAgent Suite helped me close 15 more deals this quarter. It's like having a full-time assistant that never sleeps."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JM</div>
                <div>
                  <div className="author-name">Jessica Martinez</div>
                  <div className="author-title">Top Producer, Miami</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"I was skeptical at first, but the AI actually sounds human. My response time went from hours to seconds."</p>
              <div className="testimonial-author">
                <div className="author-avatar">DK</div>
                <div>
                  <div className="author-name">David Kim</div>
                  <div className="author-title">Luxury Agent, LA</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Finally have time for my family while my business grows. CoAgent Suite handles all the tedious follow-ups."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SR</div>
                <div>
                  <div className="author-name">Sarah Rodriguez</div>
                  <div className="author-title">Team Leader, Austin</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>💡 Does it integrate with my CRM?</h3>
              <p>Yes! CoAgent Suite integrates with all major real estate CRMs including Follow Up Boss, LionDesk, and kvCORE.</p>
            </div>
            <div className="faq-item">
              <h3>🤖 Will clients know it's AI?</h3>
              <p>Only if you want them to. Our AI sounds natural and can seamlessly hand off to you when needed.</p>
            </div>
            <div className="faq-item">
              <h3>⚡ How fast can I get started?</h3>
              <p>Setup takes less than 15 minutes. We'll import your listings and you're ready to go.</p>
            </div>
            <div className="faq-item">
              <h3>💰 What's the pricing?</h3>
              <p>Plans start at $197/month. Most agents make that back from just one extra closing per year.</p>
            </div>
            <div className="faq-item">
              <h3>📱 Does it work with text messages?</h3>
              <p>Absolutely! CoAgent Suite handles SMS, email, social media DMs, and website chat - all from one platform.</p>
            </div>
            <div className="faq-item">
              <h3>🎯 Can I customize the responses?</h3>
              <p>Yes! You can train the AI with your own scripts, tone, and brand voice. It learns from your style.</p>
            </div>
            <div className="faq-item">
              <h3>🔒 Is my data secure?</h3>
              <p>Bank-level encryption and SOC 2 compliant. Your client data is protected with enterprise security.</p>
            </div>
            <div className="faq-item">
              <h3>👥 Can my team use it?</h3>
              <p>Yes! Team plans available with shared inbox, lead routing, and performance analytics for each agent.</p>
            </div>
          </div>
        </section>

        {modalFeature && (
          <div className="modal-overlay" onClick={() => setModalFeature(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalFeature(null)}>×</button>
              <div className="modal-icon">{modalFeature.icon}</div>
              <h2>{modalFeature.title}</h2>
              <p className="modal-summary">{modalFeature.summary}</p>
              <div className="modal-details">
                <h3>Key Features:</h3>
                <ul>
                  {modalFeature.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <section className="cta">
          <div className="cta-badge">🔥 Limited Time: First 100 Agents Get 50% Off</div>
          <h2 className="cta-title">Ready to 3x Your Closings?</h2>
          <p className="cta-subtitle">Join top-producing agents who never miss a lead or follow-up</p>
          <button onClick={scrollToForm} className="cta-btn">
            Start Free Trial
          </button>
          <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">CoAgent Suite</span>
              <span className="logo-pulse"></span>
            </div>
            <p className="footer-tagline">AI-powered automation for real estate agents</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CoAgent Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
