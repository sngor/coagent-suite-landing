import { useState, useEffect } from 'react'
import './App.css'
import BlueprintHouse from './BlueprintHouse'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState(null)

  const [scrollY, setScrollY] = useState(0)
  const [showNavButton, setShowNavButton] = useState(false)

  const features = [
    {
      id: 'f1',
      icon: '🔍',
      title: 'Deep Market & Brand Research',
      summary: 'We start by understanding your unique market, goals, and brand identity',
      details: [
        'Comprehensive analysis of your local market dynamics and competition',
        'Deep dive into your business goals, target audience, and unique value proposition',
        'Brand identity assessment: voice, values, visual style, and positioning',
        'Competitive landscape mapping to identify opportunities',
        'Client persona development based on your ideal buyers and sellers'
      ]
    },
    {
      id: 'f2',
      icon: '🎨',
      title: 'Brand Consistency Toolkit',
      summary: 'Build a unified, professional brand presence across every platform',
      details: [
        'Custom brand guidelines: logos, colors, fonts, and messaging templates',
        'Consistent social media content across Facebook, Instagram, and LinkedIn',
        'Professional email signatures, business cards, and marketing materials',
        'Automated brand compliance checks to ensure every touchpoint is polished',
        'Content calendar aligned with your brand voice and market trends'
      ]
    },
    {
      id: 'f3',
      icon: '🤖',
      title: 'AI Discovery Optimization',
      summary: 'Get discovered when buyers search for agents on ChatGPT, Perplexity, and AI platforms',
      details: [
        'AI-optimized agent profiles that rank in ChatGPT and Perplexity results',
        'Strategic content distribution to AI-indexed platforms and directories',
        'Real-time monitoring of AI mentions and agent recommendations',
        'Automated responses when prospects discover you through AI search',
        'Continuous optimization based on AI search trends and buyer behavior'
      ]
    },
    {
      id: 'f4',
      icon: '📈',
      title: 'Intelligent Lead Generation',
      summary: 'Attract qualified leads with content and campaigns that convert',
      details: [
        'Multi-channel lead capture: website, social media, AI platforms, and directories',
        'Automated content marketing that positions you as the local market expert',
        'Smart targeting for FSBOs, expired listings, relocations, and high-intent buyers',
        'Lead magnets and landing pages optimized for conversion',
        'Performance analytics to track what\'s working and optimize campaigns'
      ]
    },
    {
      id: 'f5',
      icon: '💬',
      title: 'Personalized Client Engagement',
      summary: 'Nurture every lead with on-brand communication that builds trust and drives action',
      details: [
        'Instant, personalized responses to inquiries using your brand voice',
        'Automated follow-up sequences that keep you top-of-mind',
        'Smart drip campaigns tailored to buyer/seller journey stages',
        'Behavioral triggers that send the right message at the right time',
        'Seamless handoff notifications when leads are ready to close'
      ]
    },
    {
      id: 'f6',
      icon: '📊',
      title: 'Performance Tracking & Optimization',
      summary: 'Measure what matters and continuously improve your results',
      details: [
        'Real-time dashboard tracking leads, conversions, and ROI',
        'AI discovery analytics: where buyers find you and what they ask',
        'Campaign performance metrics across all channels',
        'A/B testing recommendations to optimize messaging and content',
        'Monthly insights reports with actionable recommendations for growth'
      ]
    }
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowNavButton(window.scrollY > 600)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])



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
      
      setMessage('✓ Success! You\'re on the waitlist and will get early access.')
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
        <button 
          className={`nav-btn ${showNavButton ? 'visible' : ''}`}
          onClick={scrollToForm}
        >
          Join Waitlist
        </button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-badge">✨ Launching Early 2026 • Waitlist Gets Early Access</div>
          <h1 className="hero-title">
            Intelligent Tools to Build Your Brand & Generate Leads
          </h1>
          <p className="hero-subtitle">
            Designed for real estate agents to build their brand, get discovered online, and generate qualified leads.
          </p>
          <p className="early-access-note">Join the waitlist to get exclusive early access before the official launch</p>
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

        <section className="ai-trends">
          <div className="trends-container">
            <div className="cube-container">
              <div className="cube-3d">
                <div className="cube-face front">🎨</div>
                <div className="cube-face back">🔍</div>
                <div className="cube-face right">📈</div>
                <div className="cube-face left">💬</div>
                <div className="cube-face top">🤖</div>
                <div className="cube-face bottom">✨</div>
              </div>
            </div>
            <div className="trends-alert">
              <h2 className="trends-title">Your Clients Are Already Using AI—Are You?</h2>
            </div>
            <p className="trends-subtitle">Millions of homebuyers are asking ChatGPT and Perplexity for agent recommendations. CoAgent Suite ensures you show up first with intelligent brand building and lead generation tools.</p>
            
            <div className="trends-stats">
              <div className="trend-stat">
                <div className="trend-number">68%</div>
                <div className="trend-label">of buyers use AI for home search</div>
              </div>
              <div className="trend-stat">
                <div className="trend-number">2.4M+</div>
                <div className="trend-label">real estate queries on ChatGPT daily</div>
              </div>
              <div className="trend-stat">
                <div className="trend-number">0%</div>
                <div className="trend-label">of agents are optimized for AI discovery</div>
              </div>
            </div>

            <div className="solution-box">
              <h3 className="solution-title">A Complete Suite of Intelligent Tools for Modern Agents</h3>
              <p className="solution-text">CoAgent Suite combines powerful intelligent tools for your brand building and lead generation. From market research to discovery optimization, every tool works together to help you build a strong brand and attract qualified leads—while you focus on closing deals.</p>
              <div className="solution-features">
                <div className="solution-item">✓ Intelligent market research & brand positioning tools</div>
                <div className="solution-item">✓ Brand toolkit builder for consistent presence</div>
                <div className="solution-item">✓ Discovery optimization for ChatGPT, Perplexity & more</div>
                <div className="solution-item">✓ Intelligent lead generation across all channels</div>
                <div className="solution-item">✓ Client engagement & follow-up tools</div>
                <div className="solution-item">✓ Performance tracking & optimization dashboard</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mini-cta">
          <h3 className="mini-cta-title">Ready to Build Your Brand?</h3>
          <p className="mini-cta-text">Join the waitlist and get access to the complete suite of intelligent tools for agents</p>
          <button onClick={scrollToForm} className="mini-cta-btn">Join the Waitlist →</button>
        </section>

        <section className="features">
          <h2 className="section-title">Your Complete Intelligent Toolkit</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="feature-card"
                onMouseEnter={() => setActiveCard(feature.id)} 
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`feature-icon ${activeCard === feature.id ? 'bounce' : ''}`}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.summary}</p>
                <ul className="feature-details">
                  {feature.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <div className="trust-badges">
          </div>
          <h2 className="section-title">Trusted by Top Agents</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
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
              <h3>When will CoAgent Suite launch?</h3>
              <p>We're planning to officially launch in early 2026. Waitlist members will get exclusive early access to the platform before the public launch.</p>
            </div>
            <div className="faq-item">
              <h3>What makes this different from other tools?</h3>
              <p>CoAgent Suite is a complete toolkit built specifically for real estate agents. Unlike single-purpose tools, it combines brand building, discovery optimization, lead generation, and client engagement—all powered by intelligent automation that understands real estate.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a cost to join the waitlist?</h3>
              <p>No! Joining the waitlist is completely free. You'll get exclusive early access before the official launch, plus special launch pricing when we go live.</p>
            </div>
            <div className="faq-item">
              <h3>What will the pricing be?</h3>
              <p>We're finalizing pricing details and will share more information with waitlist members as we get closer to launch.</p>
            </div>
            <div className="faq-item">
              <h3>Can I help shape the product?</h3>
              <p>Absolutely! Waitlist members will be invited to provide feedback and feature requests. We're building this for agents, with agents. Your input matters.</p>
            </div>
            <div className="faq-item">
              <h3>What happens to my email?</h3>
              <p>We'll only use your email to send you launch updates and early access information. No spam, no selling your data. You can unsubscribe anytime.</p>
            </div>

          </div>
        </section>



        <section className="cta">
          <h2 className="cta-title">Get Early Access to the Complete Suite</h2>
          <p className="cta-subtitle">Join the waitlist and be first to access all the intelligent tools you need to build your brand and generate leads</p>
          <button onClick={scrollToForm} className="cta-btn">
            Join the Waitlist
          </button>
          <p className="cta-note">No credit card required</p>
        </section>
      </main>

      <footer className="footer">
        <div className="house-showcase">
          <BlueprintHouse />
        </div>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">CoAgent Suite</span>
              <span className="logo-pulse"></span>
            </div>
            <p className="footer-tagline">Intelligent tools for real estate brand building and lead generation</p>
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
