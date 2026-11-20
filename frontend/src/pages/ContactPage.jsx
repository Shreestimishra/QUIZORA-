import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

const ContactPage = () => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    email: profile?.email || '',
    category: 'other',
    subject: '',
    description: '',
    attemptId: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'login', label: 'Login or Account Issues' },
    { value: 'quiz', label: 'Quiz Not Working' },
    { value: 'question', label: 'Incorrect Question or Answer' },
    { value: 'score', label: 'Score or Results Problem' },
    { value: 'subscription', label: 'Subscription or Billing' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from('support_requests').insert([
        {
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          category: formData.category,
          subject: formData.subject,
          description: formData.description,
          related_attempt_id: formData.attemptId || null,
          status: 'new',
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: profile?.full_name || '',
        email: profile?.email || '',
        category: 'other',
        subject: '',
        description: '',
        attemptId: '',
      });
    } catch (error) {
      console.error('Error submitting support request:', error);
      setError('Failed to submit support request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || 'support@quizora.example';

  if (submitted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card p-5 text-center">
              <div className="display-1 text-success mb-3">✓</div>
              <h2 className="h3 fw-bold text-primary mb-3">Support Request Received</h2>
              <p className="text-secondary lead mb-4">
                Tech acting up? We've got you. Your request has been recorded.
              </p>
              <div className="alert alert-info mb-4" role="alert">
                <small>
                  Email notifications are not yet configured.
                </small>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setSubmitted(false)}
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mb-5">
            <h1 className="display-5 fw-bold mb-2">Need a Hand? We've Got You</h1>
            <p className="text-secondary lead">
              Something not working? Got a question? Reach out and we'll help you figure it out.
            </p>
          </div>

          <div className="card p-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <span className="display-4 me-3">📧</span>
              <div>
                <h5 className="text-primary mb-1">Email Support</h5>
                <a href={`mailto:${supportEmail}`} className="text-accent text-decoration-none">
                  {supportEmail}
                </a>
              </div>
            </div>
            <div className="alert alert-warning" role="alert">
              <small>
                This is a placeholder address. Real email delivery is not yet configured.
              </small>
            </div>
          </div>

          <div className="card p-4">
            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}

            <div className="alert alert-danger mb-4" role="alert">
              <small>
                <strong>Security Notice:</strong> Never include your password or payment card details.
              </small>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="name" className="form-label text-secondary">
                    Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="email" className="form-label text-secondary">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="form-label text-secondary">
                  Issue Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="form-label text-secondary">
                  Subject <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief summary of your issue"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label text-secondary">
                  Detailed Description <span className="text-error">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="attemptId" className="form-label text-secondary">
                  Related Quiz or Attempt ID (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="attemptId"
                  name="attemptId"
                  value={formData.attemptId}
                  onChange={handleChange}
                  placeholder="If applicable, provide the quiz or attempt ID"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Support Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
