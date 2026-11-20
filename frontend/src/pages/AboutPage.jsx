import { Link } from 'react-router-dom';

const AboutPage = () => {
  const team = [
    { name: 'Development Team', role: 'Full-stack development', icon: '💻' },
    { name: 'Design Team', role: 'UI/UX design', icon: '🎨' },
    { name: 'Content Team', role: 'Quiz creation', icon: '📝' },
    { name: 'Support Team', role: 'Customer support', icon: '🎧' },
  ];

  const values = [
    { title: 'Learning First', description: 'We believe education should be accessible and engaging for everyone.', icon: '📚' },
    { title: 'Continuous Improvement', description: 'We constantly evolve to provide better learning experiences.', icon: '📈' },
    { title: 'Community Driven', description: 'Our users shape the future of QUIZORA through feedback.', icon: '🤝' },
    { title: 'Quality Content', description: 'Every quiz is carefully crafted for accuracy and engagement.', icon: '✨' },
  ];

  const milestones = [
    { year: '2023', title: 'QUIZORA Founded', description: 'Started with a vision to make learning fun.' },
    { year: '2024', title: '10K+ Users', description: 'Reached our first major milestone.' },
    { year: '2024', title: '500+ Quizzes', description: 'Expanded our quiz library significantly.' },
    { year: '2025', title: 'Global Launch', description: 'Expanded to serve learners worldwide.' },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-2">About QUIZORA</h1>
        <p className="text-secondary lead">Think Fast. Play Smart. Rise to the Top.</p>
      </div>

      <div className="card p-5 mb-5 text-center">
        <h2 className="h3 fw-bold text-primary mb-3">Our Mission</h2>
        <p className="text-secondary lead mb-4">
          To make learning engaging, accessible, and fun for everyone through interactive quizzes and gamified education.
        </p>
        <p className="text-secondary">
          We believe that learning should be an exciting journey, not a chore. QUIZORA brings together the best of
          educational content with the excitement of gaming to create an experience that motivates and inspires.
        </p>
      </div>

      <div className="mb-5">
        <h2 className="h3 fw-bold text-primary mb-4 text-center">Our Values</h2>
        <div className="row g-4">
          {values.map((value, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card p-4 text-center h-100">
                <div className="display-1 mb-3">{value.icon}</div>
                <h5 className="text-primary mb-2">{value.title}</h5>
                <p className="text-secondary mb-0">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="h3 fw-bold text-primary mb-4 text-center">Our Journey</h2>
        <div className="row g-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="col-md-3">
              <div className="card p-4 text-center">
                <div className="display-4 fw-bold text-accent mb-2">{milestone.year}</div>
                <h5 className="text-primary mb-2">{milestone.title}</h5>
                <p className="text-secondary mb-0">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="h3 fw-bold text-primary mb-4 text-center">Meet the Team</h2>
        <div className="row g-4">
          {team.map((member, index) => (
            <div key={index} className="col-md-3">
              <div className="card p-4 text-center">
                <div className="display-1 mb-3">{member.icon}</div>
                <h5 className="text-primary mb-1">{member.name}</h5>
                <p className="text-secondary mb-0">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 text-center bg-gradient-to-r from-purple-900 to-blue-900">
        <h2 className="h3 fw-bold text-primary mb-3">Join Our Community</h2>
        <p className="text-secondary lead mb-4">
          Be part of our growing community of learners and achievers.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/contact" className="btn btn-outline-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
