import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

const DashboardPage = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [recommendedQuizzes, setRecommendedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('*, quizzes(title, category)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (attempts) {
        setRecentQuizzes(attempts);

        const totalQuizzes = attempts.length;
        const avgScore = attempts.length > 0
          ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
          : 0;
        const bestScore = attempts.length > 0
          ? Math.max(...attempts.map(a => a.score))
          : 0;
        const totalPoints = attempts.reduce((sum, a) => sum + a.score, 0);

        setStats({
          totalQuizzes,
          avgScore,
          bestScore,
          totalPoints,
        });
      }

      const { data: quizzes } = await supabase
        .from('quizzes')
        .select('*')
        .limit(4);

      if (quizzes) {
        setRecommendedQuizzes(quizzes);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2">
          Welcome back, {profile?.full_name || 'Player'}!
        </h1>
        <p className="text-secondary lead">Ready for your next level?</p>
      </div>

      {!stats || stats.totalQuizzes === 0 ? (
        <div className="card p-5 text-center mb-5">
          <div className="display-1 text-accent mb-3">🎯</div>
          <h2 className="h3 fw-bold text-primary mb-3">Your Growth Arc Starts Here</h2>
          <p className="text-secondary mb-4">
            No lore yet. Your first quiz starts the story.
          </p>
          <Link to="/quizzes" className="btn btn-primary btn-lg">
            Start Your First Quiz
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="card p-4">
                <p className="text-secondary mb-1">Quizzes Completed</p>
                <h3 className="display-6 fw-bold text-primary mb-0">
                  {stats.totalQuizzes}
                </h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card p-4">
                <p className="text-secondary mb-1">Average Score</p>
                <h3 className="display-6 fw-bold text-primary mb-0">
                  {stats.avgScore}%
                </h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card p-4">
                <p className="text-secondary mb-1">Best Score</p>
                <h3 className="display-6 fw-bold text-primary mb-0">
                  {stats.bestScore}%
                </h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card p-4">
                <p className="text-secondary mb-1">Total Points</p>
                <h3 className="display-6 fw-bold text-primary mb-0">
                  {stats.totalPoints}
                </h3>
              </div>
            </div>
          </div>

          <div className="card p-4 mb-5">
            <h3 className="h4 fw-bold text-primary mb-3">Your Growth Era</h3>
            <p className="text-secondary mb-4">
              Character development: officially in progress.
            </p>
          </div>
        </>
      )}

      <div className="card p-4 mb-5">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="h4 fw-bold text-primary mb-2">Ready to Challenge Yourself?</h3>
            <p className="text-secondary mb-0">Lock in. You've got this.</p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/quizzes" className="btn btn-primary">
              Start a Quiz
            </Link>
          </div>
        </div>
      </div>

      {recommendedQuizzes.length > 0 && (
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h4 fw-bold text-primary mb-0">Recommended for You</h3>
            <Link to="/quizzes" className="text-accent">
              View All
            </Link>
          </div>
          <div className="row g-4">
            {recommendedQuizzes.map((quiz) => (
              <div key={quiz.id} className="col-md-6 col-lg-3">
                <Link
                  to={`/quiz/${quiz.id}/setup`}
                  className="card h-100 text-decoration-none p-4"
                >
                  <div className="mb-3">
                    <span className="badge bg-primary">{quiz.category}</span>
                  </div>
                  <h5 className="text-primary mb-2">{quiz.title}</h5>
                  <p className="text-secondary mb-3">{quiz.description}</p>
                  <div className="d-flex justify-content-between align-items-center text-secondary">
                    <small>{quiz.time_limit}s</small>
                    <small>{quiz.question_count} questions</small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentQuizzes.length > 0 && (
        <div>
          <h3 className="h4 fw-bold text-primary mb-3">Recent Activity</h3>
          <div className="card">
            <div className="table-responsive">
              <table className="table table-dark mb-0">
                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuizzes.map((attempt) => (
                    <tr key={attempt.id}>
                      <td>
                        <Link
                          to={`/results/${attempt.id}`}
                          className="text-accent text-decoration-none"
                        >
                          {attempt.quizzes?.title || 'Unknown Quiz'}
                        </Link>
                      </td>
                      <td>{attempt.quizzes?.category || '-'}</td>
                      <td>
                        <span className={`badge ${attempt.score >= 70 ? 'bg-success' : attempt.score >= 50 ? 'bg-warning' : 'bg-danger'}`}>
                          {attempt.score}%
                        </span>
                      </td>
                      <td>{new Date(attempt.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
