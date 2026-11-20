import { Link } from 'react-router-dom';

const LandingPage = () => {
  const categories = [
    { name: 'Science', icon: '🔬' },
    { name: 'Technology', icon: '💻' },
    { name: 'Mathematics', icon: '📐' },
    { name: 'General Knowledge', icon: '🌍' },
    { name: 'History', icon: '📜' },
    { name: 'Geography', icon: '🗺️' },
    { name: 'Business', icon: '💼' },
    { name: 'Programming', icon: '⌨️' },
  ];

  const features = [
    { title: 'Timed Challenges', description: 'Race against the clock.' },
    { title: 'Instant Feedback', description: 'Know your results immediately.' },
    { title: 'Performance Analytics', description: 'Track your progress.' },
    { title: 'Competitive Leaderboards', description: 'Compete with others.' },
  ];

  const howItWorks = [
    { step: '1', title: 'Choose a category', description: 'Pick a topic.' },
    { step: '2', title: 'Challenge yourself', description: 'Answer questions.' },
    { step: '3', title: 'Earn your score', description: 'Get results.' },
    { step: '4', title: 'Improve your ranking', description: 'Climb the leaderboard.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                Your brain called. It wants a challenge.
              </h1>
              <p className="lead text-secondary mb-4">
                QUIZORA is where smart people compete, learn, and level up.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Start Playing
                </Link>
                <Link to="/quizzes" className="btn btn-outline-primary btn-lg">
                  Explore Quizzes
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="card p-5 mx-auto" style={{ maxWidth: '500px' }}>
                <div className="display-1 text-accent mb-3">🧠</div>
                <div className="display-6 fw-bold text-primary mb-2">10K+</div>
                <p className="text-secondary">Questions available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-secondary">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="display-5 fw-bold text-accent mb-2">500+</div>
              <p className="text-secondary">Available Quizzes</p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="display-5 fw-bold text-accent-secondary mb-2">8</div>
              <p className="text-secondary">Categories</p>
            </div>
            <div className="col-md-4">
              <div className="display-5 fw-bold text-success mb-2">Growing</div>
              <p className="text-secondary">Community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Explore Categories</h2>
            <p className="text-secondary lead">Find your domain. Master your craft.</p>
          </div>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <Link
                  to="/quizzes"
                  className="card h-100 text-decoration-none p-4 d-flex flex-column align-items-center"
                >
                  <div className="display-4 mb-3">{category.icon}</div>
                  <h5 className="text-primary mb-0">{category.name}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-secondary">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">How It Works</h2>
            <p className="text-secondary lead">Your growth arc starts here.</p>
          </div>
          <div className="row g-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 p-4">
                  <div className="display-4 fw-bold text-accent mb-3">{item.step}</div>
                  <h5 className="text-primary mb-2">{item.title}</h5>
                  <p className="text-secondary mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why QUIZORA?</h2>
            <p className="text-secondary lead">Built different. Learning edition.</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 p-4">
                  <h5 className="text-primary mb-2">{feature.title}</h5>
                  <p className="text-secondary mb-0">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-secondary">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">Ready to Level Up?</h2>
          <p className="text-secondary lead mb-4">
            Your next level is loading. Start your journey today.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
