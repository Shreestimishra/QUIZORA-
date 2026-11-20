require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Quiz submission endpoint (server-side validation)
app.post('/api/quiz/submit', async (req, res) => {
  try {
    const { userId, quizId, answers, timeTaken } = req.body;

    // Fetch questions with correct answers
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, correct_answer')
      .eq('quiz_id', quizId);

    if (questionsError) throw questionsError;

    // Calculate score
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correct_answer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);

    // Create attempt with authoritative score
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .insert([
        {
          user_id: userId,
          quiz_id: quizId,
          answers,
          time_taken: timeTaken,
          score,
        },
      ])
      .select()
      .single();

    if (attemptError) throw attemptError;

    res.json({ success: true, attempt });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get quiz attempts
app.get('/api/attempts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*, quizzes(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching attempts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Leaderboard endpoint
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*, profiles(full_name)')
      .order('score', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
