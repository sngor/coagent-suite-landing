import './Legal.css'

function TermsOfService() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using CoAgent Suite, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>CoAgent Suite provides AI-powered automation tools for real estate professionals, including lead generation, client communication, and transaction management features.</p>
        </section>

        <section>
          <h2>3. User Accounts</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>
        </section>

        <section>
          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Transmit any harmful code or malware</li>
            <li>Interfere with or disrupt the service</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>
        </section>

        <section>
          <h2>5. Subscription and Payment</h2>
          <p>Subscription fees are billed in advance on a monthly or annual basis. You authorize us to charge your payment method for all fees. Refunds are provided according to our refund policy.</p>
        </section>

        <section>
          <h2>6. Cancellation and Termination</h2>
          <p>You may cancel your subscription at any time. We reserve the right to suspend or terminate your account for violation of these terms or for any other reason at our discretion.</p>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>All content, features, and functionality of CoAgent Suite are owned by us and are protected by copyright, trademark, and other intellectual property laws.</p>
        </section>

        <section>
          <h2>8. Disclaimer of Warranties</h2>
          <p>The service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the service constitutes acceptance of the modified terms.</p>
        </section>

        <section>
          <h2>11. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2>12. Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us at:</p>
          <p><strong>Email:</strong> legal@coagentsuite.com</p>
        </section>

        <a href="/" className="back-link">← Back to Home</a>
      </div>
    </div>
  )
}

export default TermsOfService
