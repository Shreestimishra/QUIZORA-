import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const ResultsPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [attemptId]);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const { data: attemptData, error: attemptError } = await supabase
        .from('quiz_attempts')
        .select('*, quizzes(*)')
        .eq('id', attemptId)
        .single();

      if (attemptError) throw attemptError;

      setAttempt(attemptData);
      setQuiz(attemptData.quizzes);

      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', attemptData.quiz_id);

      if (questionsError) throw questionsError;

      setQuestions(questionsData || []);

      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;

      questionsData.forEach((question) => {
        const userAnswer = attemptData.answers[question.id];
        if (!userAnswer) {
          unanswered++;
        } else if (userAnswer === question.correct_answer) {
          correct++;
        } else {
          incorrect++;
        }
      });

      const score = Math.round((correct / questionsData.length) * 100);

      setResults({
        correct,
        incorrect,
        unanswered,
        score,
        total: questionsData.length,
      });
    } catch (error) {
      console.error('Error fetching results:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return "Big brain move!";
    if (score >= 70) return "Main character energy!";
    if (score >= 50) return "Character development in progress.";
    return "Every wrong answer is a clue for your comeback.";
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

  if (!results) {
    return (
      <div className="container py-5">
        <div className="card p-5 text-center">
          <h3 className="h4 fw-bold text-primary mb-2">Results Not Available</h3>
          <p className="text-secondary mb-3">Unable to load quiz results.</p>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {!showReview ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card p-5 text-center mb-4">
              <div className="display-1 mb-3">🏆</div>
              <h1 className="display-5 fw-bold text-primary mb-2">Quiz Cleared!</h1>
              <p className="text-secondary lead mb-4">Let's check the stats.</p>

              <div className="display-1 fw-bold mb-3">
                <span className={results.score >= 70 ? 'text-success' : results.score >= 50 ? 'text-warning' : 'text-error'}>
                  {results.score}%
                </span>
              </div>

              <p className="text-secondary lead mb-4">{getPerformanceMessage(results.score)}</p>

              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="bg-secondary rounded p-4">
                    <div className="display-4 mb-2">✓</div>
                    <p className="text-secondary mb-1">Correct</p>
                    <h3 className="display-6 fw-bold text-success mb-0">{results.correct}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-secondary rounded p-4">
                    <div className="display-4 mb-2">✗</div>
                    <p className="text-secondary mb-1">Incorrect</p>
                    <h3 className="display-6 fw-bold text-error mb-0">{results.incorrect}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-secondary rounded p-4">
                    <div className="display-4 mb-2">⏱️</div>
                    <p className="text-secondary mb-1">Time Taken</p>
                    <h3 className="display-6 fw-bold text-warning mb-0">
                      {Math.floor(attempt.time_taken / 60)}:{(attempt.time_taken % 60).toString().padStart(2, '0')}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowReview(true)}
                >
                  Review Answers
                </button>
                <Link
                  to={`/quiz/${quiz.id}/play`}
                  className="btn btn-outline-secondary"
                >
                  Retake Quiz
                </Link>
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="display-5 fw-bold text-primary mb-0">Answer Review</h1>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowReview(false)}
              >
                Back to Results
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = attempt.answers[question.id];
                const isCorrect = userAnswer === question.correct_answer;
                const isUnanswered = !userAnswer;

                return (
                  <div key={question.id} className="card p-4">
                    <div className="mb-3">
                      <span className="badge bg-secondary me-2">Q{index + 1}</span>
                      {isCorrect ? (
                        <span className="badge bg-success">Correct</span>
                      ) : isUnanswered ? (
                        <span className="badge bg-warning">Unanswered</span>
                      ) : (
                        <span className="badge bg-danger">Incorrect</span>
                      )}
                    </div>

                    <h5 className="text-primary mb-3">{question.question_text}</h5>

                    <div className="space-y-2 mb-3">
                      {['option_a', 'option_b', 'option_c', 'option_d'].map((optionKey, optIndex) => {
                        const optionLabel = String.fromCharCode(65 + optIndex);
                        const optionValue = question[optionKey];
                        const isUserAnswer = userAnswer === optionValue;
                        const isCorrectAnswer = question.correct_answer === optionValue;

                        let bgColor = 'bg-secondary';
                        if (isCorrectAnswer) bgColor = 'bg-success bg-opacity-25 border-success';
                        else if (isUserAnswer && !isCorrect) bgColor = 'bg-danger bg-opacity-25 border-danger';

                        return (
                          <div
                            key={optionKey}
                            className={`p-3 rounded border ${bgColor}`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="me-2 fw-bold">{optionLabel}.</span>
                              <span className={isCorrectAnswer ? 'text-success fw-bold' : 'text-secondary'}>
                                {optionValue}
                              </span>
                              {isCorrectAnswer && <span className="ms-auto text-success">✓</span>}
                              {isUserAnswer && !isCorrect && <span className="ms-auto text-error">✗</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {question.explanation && (
                      <div className="bg-secondary rounded p-3">
                        <p className="text-secondary mb-0">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowReview(false)}
              >
                Back to Results
              </button>
              <Link to="/quizzes" className="btn btn-primary">
                Explore More Quizzes
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
