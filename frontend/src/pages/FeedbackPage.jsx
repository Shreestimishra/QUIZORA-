import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

const FeedbackPage = () => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    category: 'general',
    subcategory: '',
    rating: 5,
    subject: '',
    message: '',
    email: profile?.email || '',
    attachments: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'bug', label: 'Bug Report', icon: '🐛', subcategories: ['UI Issue', 'Functionality Bug', 'Performance Issue', 'Crash', 'Other'] },
    { value: 'feature', label: 'Feature Request', icon: '💡', subcategories: ['New Quiz Category', 'Quiz Feature', 'Dashboard Feature', 'Social Feature', 'Other'] },
    { value: 'experience', label: 'Website Experience', icon: '🌐', subcategories: ['Navigation', 'Design', 'Performance', 'Mobile Experience', 'Other'] },
    { value: 'question', label: 'Quiz Question Feedback', icon: '❓', subcategories: ['Incorrect Answer', 'Unclear Question', 'Typo', 'Duplicate Question', 'Other'] },
    { value: 'subscription', label: 'Subscription Feedback', icon: '💳', subcategories: ['Pricing', 'Features', 'Payment Issue', 'Cancellation', 'Other'] },
    { value: 'content', label: 'Content Request', icon: '📝', subcategories: ['New Topic', 'More Questions', 'Difficulty Level', 'Language', 'Other'] },
    { value: 'general', label: 'General Suggestion', icon: '💬', subcategories: ['Improvement', 'Compliment', 'Other Idea', 'Other'] },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from('feedback').insert([
        {
          user_id: user?.id || null,
          category: formData.category,
          subcategory: formData.subcategory,
          rating: formData.rating,
          subject: formData.subject,
          message: formData.message,
          contact_email: formData.email || null,
          attachments: formData.attachments || null,
          status: 'new',
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        category: 'general',
        subcategory: '',
        rating: 5,
        subject: '',
        message: '',
        email: profile?.email || '',
        attachments: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  if (submitted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card p-5 text-center">
              <div className="display-1 text-success mb-3">✓</div>
              <h2 className="h3 fw-bold text-primary mb-3">Feedback Received</h2>
              <p className="text-secondary lead mb-4">
                You're helping us level up. Thanks for being part of QUIZORA!
              </p>
              <p className="text-secondary mb-4">
                We'll review your feedback and get back to you if needed.
              </p>
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
            <h1 className="display-5 fw-bold mb-2">Help Us Make QUIZORA Better</h1>
            <p className="text-secondary lead">
              Spill the feedback. We can take it. Drop your thoughts and help shape the next update.
            </p>
          </div>

          <div className="card p-4">
            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="category" className="form-label text-secondary">
                    Feedback Type <span className="text-error">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="subcategory" className="form-label text-secondary">
                    Subcategory
                  </label>
                  <select
                    className="form-select"
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                  >
                    <option value="">Select subcategory...</option>
                    {selectedCategory?.subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary mb-2">Rating</label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="btn btn-outline-secondary p-2"
                      onClick={() => handleRatingChange(star)}
                    >
                      <span
                        className={star <= formData.rating ? 'text-warning' : 'text-secondary'}
                        style={{ fontSize: '24px' }}
                      >
                        {star <= formData.rating ? '★' : '☆'}
                      </span>
                    </button>
                  ))}
                </div>
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
                  placeholder="Brief summary of your feedback"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label text-secondary">
                  Detailed Description <span className="text-error">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us more about your feedback. Be as specific as possible..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="attachments" className="form-label text-secondary">
                  Screenshots/Links (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="attachments"
                  name="attachments"
                  value={formData.attachments}
                  onChange={handleChange}
                  placeholder="Paste any relevant URLs or describe attachments"
                />
                <small className="text-secondary">
                  You can include links to screenshots or detailed descriptions of the issue.
                </small>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label text-secondary">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
                <small className="text-secondary">
                  Only if you want us to follow up with you
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>

          <div className="card p-4 mt-4">
            <h5 className="text-primary mb-3">Feedback Guidelines</h5>
            <ul className="text-secondary mb-0">
              <li className="mb-2">Be specific and provide details about your experience</li>
              <li className="mb-2">Include steps to reproduce bugs</li>
              <li className="mb-2">Share your ideas for improvements - we love suggestions!</li>
              <li className="mb-2">Be respectful and constructive in your feedback</li>
              <li className="mb-0">We read every submission and prioritize based on impact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
