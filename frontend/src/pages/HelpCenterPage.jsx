import { useState } from 'react';

const HelpCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'account', name: 'Account & Profile', icon: '👤' },
    { id: 'quizzes', name: 'Quizzes', icon: '❓' },
    { id: 'subscription', name: 'Subscription', icon: '💳' },
    { id: 'technical', name: 'Technical Issues', icon: '🔧' },
  ];

  const articles = [
    {
      id: 1,
      category: 'getting-started',
      title: 'How to create an account',
      content: 'Learn how to sign up for QUIZORA and get started with your first quiz.',
    },
    {
      id: 2,
      category: 'getting-started',
      title: 'Understanding your dashboard',
      content: 'Your dashboard shows your stats, recent quizzes, and recommendations.',
    },
    {
      id: 3,
      category: 'account',
      title: 'How to change your password',
      content: 'Go to your profile settings to update your password securely.',
    },
    {
      id: 4,
      category: 'account',
      title: 'Updating your profile information',
      content: 'You can edit your name and other details from the profile page.',
    },
    {
      id: 5,
      category: 'quizzes',
      title: 'How quizzes are scored',
      content: 'Each correct answer earns points. No penalty for wrong answers.',
    },
    {
      id: 6,
      category: 'quizzes',
      title: 'Quiz timer explained',
      content: 'You have a set time to complete each quiz. Time runs out automatically.',
    },
    {
      id: 7,
      category: 'subscription',
      title: 'Subscription plans comparison',
      content: 'Compare Free, Plus, and Pro plans to find the right fit.',
    },
    {
      id: 8,
      category: 'subscription',
      title: 'How to cancel subscription',
      content: 'You can cancel anytime from your account settings.',
    },
    {
      id: 9,
      category: 'technical',
      title: 'Browser compatibility',
      content: 'QUIZORA works on all modern browsers including Chrome, Firefox, Safari.',
    },
    {
      id: 10,
      category: 'technical',
      title: 'Troubleshooting quiz issues',
      content: 'If a quiz won't load, try refreshing the page or clearing your cache.',
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2">Help Center</h1>
        <p className="text-secondary lead">Find answers to your questions and get help.</p>
      </div>

      <div className="card p-4 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for help articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h5 className="text-primary mb-3">Categories</h5>
            <div className="list-group">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`list-group-item text-start ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="me-2">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row g-3">
            {filteredArticles.map((article) => (
              <div key={article.id} className="col-md-6">
                <div className="card p-4 h-100">
                  <h5 className="text-primary mb-2">{article.title}</h5>
                  <p className="text-secondary mb-3">{article.content}</p>
                  <button className="btn btn-outline-primary btn-sm">Read More</button>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="card p-5 text-center">
              <div className="display-1 text-secondary mb-3">🔍</div>
              <h3 className="h4 fw-bold text-primary mb-2">No articles found</h3>
              <p className="text-secondary">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card p-4 text-center">
        <h5 className="text-primary mb-2">Still need help?</h5>
        <p className="text-secondary mb-3">Can't find what you're looking for? Contact our support team.</p>
        <button className="btn btn-primary">Contact Support</button>
      </div>
    </div>
  );
};

export default HelpCenterPage;
