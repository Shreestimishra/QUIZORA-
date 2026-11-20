import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const QuizSetupPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (error) throw error;

      setQuiz(data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      navigate('/quizzes');
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

  if (!quiz) {
    return (
      <div className="container py-5">
        <div className="card p-5 text-center">
          <h3 className="h4 fw-bold text-primary mb-2">Quiz Not Found</h3>
          <p className="text-secondary mb-3">The quiz doesn't exist.</p>
          <Link to="/quizzes" className="btn btn-primary">
            Browse Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/quizzes" className="btn btn-outline-secondary mb-4">
        Back to Quizzes
      </Link>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-5">
            <div className="text-center mb-4">
              <span className="badge bg-primary mb-3">{quiz.category}</span>
              <h1 className="display-5 fw-bold text-primary mb-2">{quiz.title}</h1>
              <p className="text-secondary lead">{quiz.description}</p>
            </div>

            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="bg-secondary rounded p-4 text-center">
                  <div className="display-4 mb-2">📝</div>
                  <p className="text-secondary mb-1">Questions</p>
                  <h3 className="display-6 fw-bold text-primary mb-0">
                    {quiz.question_count}
                  </h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-secondary rounded p-4 text-center">
                  <div className="display-4 mb-2">⏱️</div>
                  <p className="text-secondary mb-1">Time Limit</p>
                  <h3 className="display-6 fw-bold text-primary mb-0">
                    {quiz.time_limit}s
                  </h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-secondary rounded p-4 text-center">
                  <div className="display-4 mb-2">🎯</div>
                  <p className="text-secondary mb-1">Difficulty</p>
                  <h3 className="display-6 fw-bold text-primary mb-0">
                    {quiz.difficulty}
                  </h3>
                </div>
              </div>
            </div>

            <div className="card bg-secondary p-4 mb-5">
              <h5 className="text-primary mb-3">Scoring Rules</h5>
              <ul className="text-secondary mb-0">
                <li className="mb-2">Each correct answer earns points</li>
                <li className="mb-2">No penalty for incorrect answers</li>
                <li className="mb-2">Score is calculated as a percentage</li>
                <li className="mb-0">Unanswered questions count as incorrect</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-secondary mb-3">Lock in. You've got this.</p>
              <Link
                to={`/quiz/${quiz.id}/play`}
                className="btn btn-primary btn-lg"
              >
                Start Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetupPage;
