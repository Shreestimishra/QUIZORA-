import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuizAndQuestions();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizId]);

  useEffect(() => {
    if (timeRemaining > 0 && !loading) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeRemaining, loading]);

  const fetchQuizAndQuestions = async () => {
    try {
      setLoading(true);

      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (quizError) throw quizError;

      setQuiz(quizData);
      setTimeRemaining(quizData.time_limit);

      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('id, question_text, option_a, option_b, option_c, option_d')
        .eq('quiz_id', quizId);

      if (questionsError) throw questionsError;

      setQuestions(questionsData || []);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      navigate('/quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (submitting) return;

    const unansweredCount = questions.length - Object.keys(selectedAnswers).length;

    if (unansweredCount > 0 && timeRemaining > 0) {
      const confirmed = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Submit anyway?`
      );
      if (!confirmed) return;
    }

    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: attemptData, error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert([
          {
            user_id: user.id,
            quiz_id: quizId,
            answers: selectedAnswers,
            time_taken: quiz.time_limit - timeRemaining,
          },
        ])
        .select()
        .single();

      if (attemptError) throw attemptError;

      navigate(`/results/${attemptData.id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
      setSubmitting(false);
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

  if (!quiz || questions.length === 0) {
    return (
      <div className="container py-5">
        <div className="card p-5 text-center">
          <h3 className="h4 fw-bold text-primary mb-2">Quiz Not Available</h3>
          <p className="text-secondary mb-3">This quiz has no questions.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = selectedAnswers[currentQuestion.id];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="text-secondary">Question {currentQuestionIndex + 1} of {questions.length}</span>
              </div>
              <div className={`display-6 fw-bold ${timeRemaining <= 30 ? 'text-error' : 'text-primary'}`}>
                ⏱️ {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card p-5 mb-4">
            <h3 className="h4 fw-bold text-primary mb-4">{currentQuestion.question_text}</h3>

            <div className="space-y-3">
              {['option_a', 'option_b', 'option_c', 'option_d'].map((optionKey, index) => {
                const optionLabel = String.fromCharCode(65 + index);
                const optionValue = currentQuestion[optionKey];
                const isSelected = selectedAnswer === optionValue;

                return (
                  <button
                    key={optionKey}
                    className={`w-100 text-start p-4 rounded border ${
                      isSelected
                        ? 'border-primary bg-primary bg-opacity-10'
                        : 'border-secondary bg-secondary'
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion.id, optionValue)}
                  >
                    <div className="d-flex align-items-center">
                      <div className={`me-3 fw-bold ${isSelected ? 'text-primary' : 'text-secondary'}`}>
                        {optionLabel}.
                      </div>
                      <div className={isSelected ? 'text-primary' : 'text-secondary'}>
                        {optionValue}
                      </div>
                      {isSelected && <span className="ms-auto text-primary">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>

            <div className="d-flex gap-2">
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
