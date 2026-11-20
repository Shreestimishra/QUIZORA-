import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const QuizExplorerPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [searchTerm, selectedCategory, selectedDifficulty, quizzes]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('title');

      if (error) throw error;

      setQuizzes(data || []);
      setFilteredQuizzes(data || []);

      const uniqueCategories = [...new Set(data?.map(q => q.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuizzes = () => {
    let filtered = [...quizzes];

    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quiz => quiz.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }

    setFilteredQuizzes(filtered);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
      return 'bg-secondary';
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
        <h1 className="display-5 fw-bold mb-2">Explore Quizzes</h1>
        <p className="text-secondary lead">Find your domain. Master your craft.</p>
      </div>

      <div className="card p-4 mb-5">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {filteredQuizzes.length === 0 ? (
        <div className="card p-5 text-center">
          <div className="display-1 text-secondary mb-3">📚</div>
          <h3 className="h4 fw-bold text-primary mb-2">No Quizzes Found</h3>
          <p className="text-secondary mb-0">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="col-md-6 col-lg-4">
              <div className="card h-100 p-4">
                <div className="mb-3">
                  <span className="badge bg-primary me-2">{quiz.category}</span>
                  <span className={`badge ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <h5 className="text-primary mb-2">{quiz.title}</h5>
                <p className="text-secondary mb-3">{quiz.description}</p>
                <div className="d-flex justify-content-between align-items-center text-secondary mb-3">
                  <small>{quiz.question_count} questions</small>
                  <small>{quiz.time_limit}s</small>
                </div>
                <Link
                  to={`/quiz/${quiz.id}/setup`}
                  className="btn btn-primary w-100"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizExplorerPage;
