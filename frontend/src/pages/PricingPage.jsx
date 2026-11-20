import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PricingPage = () => {
  const { user, profile } = useAuth();

  const plans = [
    {
      id: 'free',
      name: 'Free Mode',
      tagline: 'The starter pack.',
      price: '₹0',
      period: 'forever',
      icon: '⚡',
      recommended: false,
      features: [
        'Access to free quizzes',
        'Core quiz categories',
        'Standard difficulty levels',
        'Basic score reports',
        'Personal quiz history',
        'Daily practice challenges',
        'Standard leaderboard access',
        'Basic learning progress statistics',
      ],
      cta: 'Start Free',
      ctaLink: user ? '/dashboard' : '/register',
    },
    {
      id: 'plus',
      name: 'Plus Mode',
      tagline: 'Your glow-up, but make it intellectual.',
      price: '₹149',
      period: '/month',
      icon: '⭐',
      recommended: true,
      features: [
        'Everything in Free',
        'Full published quiz library',
        'More practice challenges',
        'Advanced performance analytics',
        'Category-specific accuracy reports',
        'Personalized revision recommendations',
        'Additional difficulty levels',
        'Detailed answer explanations',
        'Extended quiz history',
        'Additional themes (coming soon)',
      ],
      cta: 'Unlock Plus',
      ctaLink: '#',
      demoMode: true,
    },
    {
      id: 'pro',
      name: 'Big Brain Energy',
      tagline: 'Built different. Learning edition.',
      price: '₹299',
      period: '/month',
      icon: '👑',
      recommended: false,
      features: [
        'Everything in Plus',
        'Advanced learning analytics',
        'Personalized practice sessions',
        'Custom quiz creation (coming soon)',
        'Additional challenge modes',
        'Detailed progress reports',
        'Advanced streak tracking',
        'Milestone achievements',
        'Priority support (coming soon)',
      ],
      cta: 'Go Pro',
      ctaLink: '#',
      demoMode: true,
    },
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your subscription at any time.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, and UPI payments.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Free Mode is available forever with no payment required.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time.',
    },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-2">Choose Your Plan</h1>
        <p className="text-secondary lead">
          Start free. Find your flow. Or unlock your full potential.
        </p>
        <p className="text-secondary">
          <small>* Displayed prices are proposed demonstration prices.</small>
        </p>
      </div>

      <div className="row g-4 mb-5">
        {plans.map((plan) => (
          <div key={plan.id} className="col-md-4">
            <div className={`card h-100 p-4 position-relative ${plan.recommended ? 'border-primary border-2' : ''}`}>
              {plan.recommended && (
                <div className="position-absolute top-0 start-50 translate-middle-x">
                  <span className="badge bg-primary px-3 py-2">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <div className="display-1 mb-3">{plan.icon}</div>
                <h3 className="h4 fw-bold text-primary mb-1">{plan.name}</h3>
                <p className="text-secondary mb-3">{plan.tagline}</p>
                <div className="display-4 fw-bold text-primary mb-1">
                  {plan.price}
                </div>
                <p className="text-secondary">{plan.period}</p>
              </div>

              <ul className="list-unstyled mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    <span className="text-success me-2">✓</span>
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.demoMode && (
                <div className="alert alert-warning mb-3" role="alert">
                  <small>
                    <strong>Demo Mode:</strong> Real billing not configured.
                  </small>
                </div>
              )}

              <Link
                to={plan.ctaLink}
                className={`btn w-100 ${plan.recommended ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {user && profile && (
        <div className="card p-4 mb-5 text-center">
          <h5 className="text-primary mb-2">Current Subscription</h5>
          <p className="text-secondary mb-0">
            You are currently on <span className="text-accent fw-bold">{profile.subscription_tier || 'Free'}</span> mode.
          </p>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="h3 fw-bold text-primary mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-4">
                <h5 className="text-primary mb-2">{faq.question}</h5>
                <p className="text-secondary mb-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
