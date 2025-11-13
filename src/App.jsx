import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState(null)
  const [modalFeature, setModalFeature] = useState(null)
  const [scrollY, setScrollY] = useState(0)

  const features = [
    {
      id: 'f1',
      icon: '🏠',
      title: 'Intelligent Lead Generation',
      summary: 'Never miss a potential client—AI discovers and engages motivated buyers and sellers 24/7',
      details: [
        'Multi-channel prospecting: Zillow, Realtor.com, Facebook, Instagram, and more',
        'Smart targeting: FSBOs, expired listings, pre-foreclosures, and high-intent prospects',
        'Hyper-local campaigns optimized for your farm areas and neighborhoods',
        'Lightning-fast response to inquiries—capture leads before competitors do'
      ]
    },
    {
      id: 'f2',
      icon: '💬',
      title: 'AI-Powered Conversations',
      summary: 'Engage every prospect with human-like, personalized responses that build trust and book appointments',
      details: [
        'Instant answers to property questions, pricing, and showing availability',
        'Comprehensive neighborhood data: schools, amenities, market trends, and more',
        'Proactive outreach with market updates and perfectly-matched new listings',
        'Smart handoff to you when leads are ready to convert—no opportunity wasted'
      ]
    },
    {
      id: 'f3',
      icon: '🔥',
      title: 'Smart Qualification & Nurturing',
      summary: 'Focus on ready-to-close clients while AI nurtures everyone else until they\'re ready',
      details: [
        'Advanced buyer qualification: budget verification, timeline assessment, and preference matching',
        'Seller readiness scoring based on motivation, property condition, and market timing',
        'Intelligent drip campaigns that adapt to each lead\'s behavior and engagement',
        'Seamless CRM and MLS integration—all your data in one place, always up-to-date'
      ]
    },
    {
      id: 'f4',
      icon: '✅',
      title: 'Automated Transaction Management',
      summary: 'Keep every deal on track from contract to close with zero manual follow-up',
      details: [
        'Smart reminders for appointments, inspections, and critical deadlines',
        'Automated post-showing follow-ups that keep you top-of-mind',
        'Real-time transaction tracking with automatic client status updates',
        'Post-closing automation: referral requests, reviews, and anniversary touchpoints'
      ]
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
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
      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api/collect-lead'
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) throw new Error('Failed to submit')
      
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
      <div className="bg-gradient-orb orb-1" style={{ transform: `translate(0, ${scrollY * 0.3}px)` }}></div>
      <div className="bg-gradient-orb orb-2" style={{ transform: `translate(0, ${scrollY * 0.2}px)` }}></div>
      <div className="bg-gradient-orb orb-3" style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))` }}></div>
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
          <div className="hero-badge">✨ Coming Soon: AI for Real Estate Agents</div>
          <h1 className="hero-title">
            The AI Assistant That Will 3x Your Closings While You Sleep
          </h1>
          <p className="hero-subtitle">
            Join the waitlist for CoAgent Suite—the AI platform that automates lead generation, client conversations, and follow-ups. Be among the first to transform your real estate business.
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
              ) : 'Join the Waitlist'}
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
          <h2 className="section-title">What You'll Get When We Launch</h2>
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
          <h2 className="section-title">What Agents Are Saying</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"I've been testing the early version for 3 months and already closed 6 extra deals. Can't wait for the full launch—this is going to change everything for agents."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JM</div>
                <div>
                  <div className="author-name">Jessica Martinez</div>
                  <div className="author-title">Real Estate Agent, Miami, FL</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Finally, an AI that actually understands real estate. The preview already responds faster than I ever could. This is the future of our industry."</p>
              <div className="testimonial-author">
                <div className="author-avatar">DK</div>
                <div>
                  <div className="author-name">David Kim</div>
                  <div className="author-title">Real Estate Agent, Los Angeles, CA</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"I signed up for early access and got a sneak peek. Even in preview, it's saving me 10+ hours a week. Get on the waitlist now—you won't regret it."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SR</div>
                <div>
                  <div className="author-name">Sarah Rodriguez</div>
                  <div className="author-title">Real Estate Agent, Austin, TX</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>💡 When will CoAgent Suite launch?</h3>
              <p>We're currently in private beta and planning to launch in Q2 2024. Waitlist members will get priority access and exclusive early-bird pricing.</p>
            </div>
            <div className="faq-item">
              <h3>🤖 What makes this different from other AI tools?</h3>
              <p>CoAgent Suite is built specifically for real estate agents. It understands MLS data, property details, market trends, and the unique sales cycle of real estate—not just generic chatbot responses.</p>
            </div>
            <div className="faq-item">
              <h3>⚡ Is there a cost to join the waitlist?</h3>
              <p>No! Joining the waitlist is completely free. You'll get early access, exclusive updates, and special launch pricing when we go live.</p>
            </div>
            <div className="faq-item">
              <h3>💰 What will the pricing be?</h3>
              <p>We're finalizing pricing, but expect plans starting around $197/month. Waitlist members will receive 50% off for the first 6 months as a thank you for early support.</p>
            </div>
            <div className="faq-item">
              <h3>📱 Will it work with my CRM and tools?</h3>
              <p>Yes! We're building integrations with all major real estate CRMs (Follow Up Boss, LionDesk, kvCORE), MLS systems, and communication platforms. Let us know your tools when you sign up.</p>
            </div>
            <div className="faq-item">
              <h3>🎯 Can I help shape the product?</h3>
              <p>Absolutely! Waitlist members will be invited to provide feedback and feature requests. We're building this for agents, with agents. Your input matters.</p>
            </div>
            <div className="faq-item">
              <h3>🔒 What happens to my email?</h3>
              <p>We'll only use your email to send you launch updates and early access information. No spam, no selling your data. You can unsubscribe anytime.</p>
            </div>
            <div className="faq-item">
              <h3>👥 Can I refer other agents?</h3>
              <p>Yes! We'll send you a referral link after you join. For every agent you refer, you'll move up in the waitlist and unlock bonus features at launch.</p>
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
          <div className="cta-badge">🔥 Limited Spots: First 500 on Waitlist Get 50% Off for Life</div>
          <h2 className="cta-title">Don't Miss Out on Early Access</h2>
          <p className="cta-subtitle">Join the waitlist now and be among the first agents to experience the future of real estate automation</p>
          <button onClick={scrollToForm} className="cta-btn">
            Reserve Your Spot—It's Free
          </button>
          <p className="cta-note">No credit card required • Priority access • Exclusive launch pricing • Cancel anytime</p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">CoAgent Suite</span>
              <span className="logo-pulse"></span>
            </div>
            <p className="footer-tagline">Empowering real estate professionals with intelligent automation</p>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="mailto:contact@coagentsuite.com">Contact</a>
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
