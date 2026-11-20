import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

const ProfilePage = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setEditName(profile.full_name || '');
      fetchProfileData();
    }
  }, [profile]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('*, quizzes(title, category)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (attempts) {
        setRecentAttempts(attempts);

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
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) return;

    setSaving(true);
    try {
      await updateProfile({ full_name: editName });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
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
      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card p-4 mb-4">
            <div className="text-center mb-4">
              <div className="bg-secondary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
                <span className="display-4 fw-bold text-accent">
                  {(profile?.full_name || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              {editing ? (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your name"
                  />
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        setEditing(false);
                        setEditName(profile?.full_name || '');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="h4 fw-bold text-primary mb-1">{profile?.full_name || 'Player'}</h3>
                  <p className="text-secondary mb-3">{profile?.email}</p>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>

            <div className="mb-4">
              <p className="text-secondary">Joined {new Date(user?.created_at).toLocaleDateString()}</p>
              <p className="text-secondary">Subscription: <span className="text-primary fw-bold">{profile?.subscription_tier || 'Free'}</span></p>
            </div>

            <button
              className="btn btn-outline-danger w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {stats && stats.totalQuizzes > 0 && (
            <div className="card p-4">
              <h5 className="text-primary mb-3">Your Stats</h5>
              <div className="space-y-3">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Quizzes Completed</span>
                  <span className="text-primary fw-bold">{stats.totalQuizzes}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Average Score</span>
                  <span className="text-primary fw-bold">{stats.avgScore}%</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Best Score</span>
                  <span className="text-primary fw-bold">{stats.bestScore}%</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Total Points</span>
                  <span className="text-primary fw-bold">{stats.totalPoints}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-8">
          <div className="card p-4 mb-4">
            <h5 className="text-primary mb-3">Your Growth Era</h5>
            {!stats || stats.totalQuizzes === 0 ? (
              <p className="text-secondary mb-0">
                Your growth arc starts with your first quiz.
              </p>
            ) : (
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="bg-secondary rounded p-3">
                    <div className="display-4 mb-2">🏆</div>
                    <p className="text-secondary mb-1">Best Performance</p>
                    <p className="text-primary fw-bold mb-0">{stats.bestScore}% accuracy</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-secondary rounded p-3">
                    <div className="display-4 mb-2">📈</div>
                    <p className="text-secondary mb-1">Average Accuracy</p>
                    <p className="text-primary fw-bold mb-0">{stats.avgScore}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card p-4">
            <h5 className="text-primary mb-3">Recent Quiz History</h5>
            {!stats || stats.totalQuizzes === 0 ? (
              <div className="text-center py-4">
                <div className="display-1 text-secondary mb-3">📚</div>
                <p className="text-secondary mb-0">No lore yet. Your first quiz starts the story.</p>
              </div>
            ) : (
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
                    {recentAttempts.map((attempt) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
