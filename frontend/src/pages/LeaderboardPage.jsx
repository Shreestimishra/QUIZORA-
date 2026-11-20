import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*, profiles(full_name)')
        .order('score', { ascending: false })
        .limit(50);

      if (error) throw error;

      const userScores = {};
      data.forEach((attempt) => {
        const userId = attempt.user_id;
        const userName = attempt.profiles?.full_name || 'Anonymous';
        if (!userScores[userId]) {
          userScores[userId] = {
            userId,
            userName,
            totalScore: 0,
            quizCount: 0,
          };
        }
        userScores[userId].totalScore += attempt.score;
        userScores[userId].quizCount += 1;
      });

      const leaderboardArray = Object.values(userScores)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 20);

      setLeaderboard(leaderboardArray);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const userIndex = leaderboardArray.findIndex(entry => entry.userId === user.id);
        if (userIndex !== -1) {
          setUserRank(userIndex + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
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
        <h1 className="display-5 fw-bold mb-2">Leaderboard</h1>
        <p className="text-secondary lead">The leaderboard is calling. See where you stand.</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="card p-5 text-center">
          <div className="display-1 text-secondary mb-3">🏆</div>
          <h3 className="h4 fw-bold text-primary mb-2">No Rankings Yet</h3>
          <p className="text-secondary mb-0">
            Be the first to complete a quiz and claim your spot!
          </p>
        </div>
      ) : (
        <>
          {userRank && (
            <div className="card p-4 mb-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span className="display-4">🥇</span>
                </div>
                <div>
                  <p className="text-secondary mb-0">Your Rank</p>
                  <h3 className="display-6 fw-bold text-primary mb-0">#{userRank}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="table-responsive">
              <table className="table table-dark mb-0">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Total Score</th>
                    <th>Quizzes Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.userId}>
                      <td>
                        <span className="fw-bold">#{index + 1}</span>
                      </td>
                      <td className="text-primary fw-bold">{entry.userName}</td>
                      <td>
                        <span className="badge bg-success">{entry.totalScore} pts</span>
                      </td>
                      <td>{entry.quizCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
