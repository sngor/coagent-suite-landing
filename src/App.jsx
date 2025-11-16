import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);

  const [scrollY, setScrollY] = useState(0);
  const [showNavButton, setShowNavButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      id: "f1",
      icon: "🔍",
      title: "Deep Market & Brand Research",
      summary:
        "We start by understanding your unique market, goals, and brand identity",
      details: [
        "Comprehensive analysis of your local market dynamics and competition",
        "Deep dive into your business goals, target audience, and unique value proposition",
        "Brand identity assessment: voice, values, visual style, and positioning",
        "Competitive landscape mapping to identify opportunities",
        "Client persona development based on your ideal buyers and sellers",
      ],
    },
    {
      id: "f2",
      icon: "🎨",
      title: "Brand Consistency Toolkit",
      summary:
        "Build a unified, professional brand presence across every platform",
      details: [
        "Custom brand guidelines: logos, colors, fonts, and messaging templates",
        "Consistent social media content across Facebook, Instagram, and LinkedIn",
        "Professional email signatures, business cards, and marketing materials",
        "Automated brand compliance checks to ensure every touchpoint is polished",
        "Content calendar aligned with your brand voice and market trends",
      ],
    },
    {
      id: "f3",
      icon: "🤖",
      title: "AI Discovery Optimization",
      summary:
        "Get discovered when buyers search for agents on ChatGPT, Perplexity, and AI platforms",
      details: [
        "AI-optimized agent profiles that rank in ChatGPT and Perplexity results",
        "Strategic content distribution to AI-indexed platforms and directories",
        "Real-time monitoring of AI mentions and agent recommendations",
        "Automated responses when prospects discover you through AI search",
        "Continuous optimization based on AI search trends and buyer behavior",
      ],
    },
    {
      id: "f4",
      icon: "📈",
      title: "Intelligent Lead Generation",
      summary:
        "Attract qualified leads with content and campaigns that convert",
      details: [
        "Multi-channel lead capture: website, social media, AI platforms, and directories",
        "Automated content marketing that positions you as the local market expert",
        "Smart targeting for FSBOs, expired listings, relocations, and high-intent buyers",
        "Lead magnets and landing pages optimized for conversion",
        "Performance analytics to track what's working and optimize campaigns",
      ],
    },
    {
      id: "f5",
      icon: "💬",
      title: "Personalized Client Engagement",
      summary:
        "Nurture every lead with on-brand communication that builds trust and drives action",
      details: [
        "Instant, personalized responses to inquiries using your brand voice",
        "Automated follow-up sequences that keep you top-of-mind",
        "Smart drip campaigns tailored to buyer/seller journey stages",
        "Behavioral triggers that send the right message at the right time",
        "Seamless handoff notifications when leads are ready to close",
      ],
    },
    {
      id: "f6",
      icon: "📊",
      title: "Performance Tracking & Optimization",
      summary: "Measure what matters and continuously improve your results",
      details: [
        "Real-time dashboard tracking leads, conversions, and ROI",
        "AI discovery analytics: where buyers find you and what they ask",
        "Campaign performance metrics across all channels",
        "A/B testing recommendations to optimize messaging and content",
        "Monthly insights reports with actionable recommendations for growth",
      ],
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowNavButton(window.scrollY > 600);
      
      const solutionBox = document.querySelector('.solution-box');
      if (solutionBox) {
        const rect = solutionBox.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.8);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToForm = () => {
    document
      .querySelector(".hero-input")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => document.querySelector(".hero-input")?.focus(), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiEndpoint =
        import.meta.env.VITE_API_ENDPOINT || "/api/collect-lead";
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setMessage(
        "✓ Success! You're on the waitlist and will get early access."
      );
      setEmail("");
    } catch (error) {
      setMessage("❌ Error. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="app">
      <div
        className="bg-gradient-orb orb-1"
        style={{ transform: `translate(0, ${scrollY * 0.3}px)` }}
      ></div>
      <div
        className="bg-gradient-orb orb-2"
        style={{ transform: `translate(0, ${scrollY * 0.2}px)` }}
      ></div>
      <div
        className="bg-gradient-orb orb-3"
        style={{
          transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`,
        }}
      ></div>
      <div className="bg-grid"></div>
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <nav className="nav">
        <div className="logo">
          <span className="logo-text">Bayon Coagent</span>
          <span className="logo-pulse"></span>
        </div>
        <button
          className={`nav-btn ${showNavButton ? "visible" : ""}`}
          onClick={scrollToForm}
        >
          Join Waitlist
        </button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-badge animate-fade-in">
            ✨ Launching Early 2026 • Waitlist Gets Early Access
          </div>
          <div className="cube-container animate-float">
            <div className="cube-3d">
              <div className="cube-face front">🎨</div>
              <div className="cube-face back">🔍</div>
              <div className="cube-face right">📈</div>
              <div className="cube-face left">💬</div>
              <div className="cube-face top">🤖</div>
              <div className="cube-face bottom">✨</div>
            </div>
          </div>
          <h1 className="hero-title animate-slide-up">
            Your Clients Are Already Using AI—Are You?
          </h1>
          <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Millions of homebuyers are asking ChatGPT and Perplexity for agent
            recommendations. Bayon Coagent ensures you show up first with
            intelligent brand building and lead generation tools.
          </p>
          <form onSubmit={handleSubmit} className="hero-form animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="hero-input"
            />
            <button
              type="submit"
              disabled={loading}
              className={`hero-btn ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Joining...
                </>
              ) : (
                "Join the Waitlist"
              )}
            </button>
          </form>
          {message && <p className="success-msg">{message}</p>}
          <div className="hero-stats animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div
              className="stat"
              onMouseEnter={() => setActiveCard("stat1")}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`stat-value ${
                  activeCard === "stat1" ? "active" : ""
                }`}
              >
                68%
              </div>
              <div className="stat-label">of buyers use AI for home search</div>
            </div>
            <div
              className="stat"
              onMouseEnter={() => setActiveCard("stat2")}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`stat-value ${
                  activeCard === "stat2" ? "active" : ""
                }`}
              >
                2.4M+
              </div>
              <div className="stat-label">
                real estate queries on ChatGPT daily
              </div>
            </div>
            <div
              className="stat"
              onMouseEnter={() => setActiveCard("stat3")}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`stat-value ${
                  activeCard === "stat3" ? "active" : ""
                }`}
              >
                0%
              </div>
              <div className="stat-label">
                of agents are optimized for AI discovery
              </div>
            </div>
          </div>
        </section>

        <section className="ai-trends">
          <div className="trends-container">
            <div className={`solution-box ${isVisible ? 'animate-in' : ''}`}>
              <h3 className="solution-title">
                A Complete Suite of Intelligent Tools for Modern Agents
              </h3>
              <p className="solution-text">
                Bayon Coagent combines powerful intelligent tools for your brand
                building and lead generation. From market research to discovery
                optimization, every tool works together to help you build a
                strong brand and attract qualified leads
              </p>
              <div className="solution-features">
                {[
                  '✓ Intelligent market research & brand positioning tools',
                  '✓ Brand toolkit builder for consistent presence',
                  '✓ Discovery optimization for ChatGPT & other AI platforms',
                  '✓ Intelligent lead generation across all channels',
                  '✓ Client engagement tools',
                  '✓ Performance tracking & optimization dashboard'
                ].map((item, index) => (
                  <div key={index} className="solution-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">Bayon Coagent</span>
              <span className="logo-pulse"></span>
            </div>
            <p className="footer-tagline">
              Intelligent tools for real estate brand building and lead
              generation
            </p>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="mailto:contact@bayoncoagent.com">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Bayon Coagent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
