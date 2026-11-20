const PrivacyPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mb-5">
            <h1 className="display-5 fw-bold mb-2">Privacy Policy</h1>
            <p className="text-secondary">Last updated: January 2024</p>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">1. Information We Collect</h2>
            <p className="text-secondary mb-2">
              We collect information you provide directly to us, including:
            </p>
            <ul className="text-secondary">
              <li>Name and email address when you create an account</li>
              <li>Quiz results and performance data</li>
              <li>Feedback and support requests</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">2. How We Use Your Information</h2>
            <p className="text-secondary mb-2">
              We use your information to:
            </p>
            <ul className="text-secondary">
              <li>Provide and improve our services</li>
              <li>Track your quiz performance and progress</li>
              <li>Communicate with you about your account</li>
              <li>Process payments for subscriptions</li>
              <li>Respond to your feedback and support requests</li>
            </ul>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">3. Data Security</h2>
            <p className="text-secondary">
              We implement appropriate security measures to protect your personal information. This includes encryption,
              secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">4. Your Rights</h2>
            <p className="text-secondary mb-2">
              You have the right to:
            </p>
            <ul className="text-secondary">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">5. Third-Party Services</h2>
            <p className="text-secondary">
              We use third-party services including Supabase for database and authentication, and payment processors
              for subscription management. These services have their own privacy policies.
            </p>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">6. Cookies</h2>
            <p className="text-secondary">
              We use cookies to improve your experience, analyze usage, and for authentication purposes. You can
              control cookie settings through your browser.
            </p>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">7. Children's Privacy</h2>
            <p className="text-secondary">
              QUIZORA is not intended for children under 13. We do not knowingly collect personal information from
              children under 13.
            </p>
          </div>

          <div className="card p-4 mb-4">
            <h2 className="h4 fw-bold text-primary mb-3">8. Changes to This Policy</h2>
            <p className="text-secondary">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the
              new policy on this page.
            </p>
          </div>

          <div className="card p-4">
            <h2 className="h4 fw-bold text-primary mb-3">9. Contact Us</h2>
            <p className="text-secondary mb-2">
              If you have questions about this privacy policy, please contact us:
            </p>
            <p className="text-secondary">
              Email: support@quizora.example
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
