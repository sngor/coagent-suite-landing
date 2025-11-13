import './Legal.css'

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Email address when you sign up for early access</li>
            <li>Contact information when you communicate with us</li>
            <li>Usage data and analytics when you use our services</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you updates about CoAgent Suite</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns and optimize user experience</li>
          </ul>
        </section>

        <section>
          <h2>3. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who assist in our operations</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts.</p>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Email:</strong> privacy@coagentsuite.com</p>
        </section>

        <a href="/" className="back-link">← Back to Home</a>
      </div>
    </div>
  )
}

export default PrivacyPolicy
