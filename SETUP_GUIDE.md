# QUIZORA - Quick Setup Guide

This guide will help you get QUIZORA running locally in minutes.

## Prerequisites
- Node.js (v18 or higher) installed
- npm or yarn
- A Supabase account (free tier is sufficient)

## Step 1: Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in project details:
   - Name: quizora
   - Database Password: (save this securely)
   - Region: Choose closest to you
4. Wait for project to be ready (1-2 minutes)
5. Go to Project Settings > API
6. Copy these values:
   - Project URL
   - anon public key
   - service_role key (needed for backend)

## Step 2: Database Setup (2 minutes)

1. In Supabase, go to SQL Editor
2. Click "New Query"
3. Copy the contents of `database/migrations/001_initial_schema.sql`
4. Paste into the SQL Editor and click "Run"
5. Click "New Query" again
6. Copy the contents of `database/seed/001_sample_data.sql`
7. Paste into the SQL Editor and click "Run"

This creates all tables, RLS policies, and sample quiz data.

## Step 3: Frontend Configuration (2 minutes)

1. Open `frontend/.env` in your editor
2. Replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_API_URL=http://localhost:5000
   VITE_SUPPORT_EMAIL=support@quizora.example
   ```
3. Save the file

## Step 4: Backend Configuration (2 minutes)

1. Open `backend/.env` in your editor
2. Replace the placeholder values:
   ```
   PORT=5000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   FRONTEND_URL=http://localhost:5173
   ```
3. Save the file

**Important**: Never commit the backend `.env` file with real secrets to git.

## Step 5: Install Dependencies (3 minutes)

**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
```

## Step 6: Run the Application

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

## Step 7: Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Sign Up" to create an account
3. Fill in registration form and submit
4. You'll be redirected to the dashboard
5. Click "Start a Quiz" or "Explore Quizzes"
6. Select a quiz and start playing
7. Complete the quiz and view results
8. Explore other features: Profile, Leaderboard, Pricing, Feedback, Contact

## Troubleshooting

### Frontend won't start
- Make sure you're in the `frontend` directory
- Check that Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

### Backend won't start
- Make sure you're in the `backend` directory
- Check that `.env` file exists and has correct values
- Verify Supabase credentials are correct

### Database errors
- Make sure you ran both SQL migration and seed files
- Check Supabase dashboard for any error messages
- Verify RLS policies are enabled

### Authentication not working
- Check that Supabase Auth is enabled in your project
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check browser console for error messages

### Quiz data not loading
- Make sure you ran the seed SQL file
- Check Supabase Table Editor to verify quizzes exist
- Verify RLS policies allow public read access

## Project Structure Overview

```
quiz app/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # Page components (Landing, Dashboard, Quiz, etc.)
│   │   ├── layouts/      # Layout components (Navigation, Footer)
│   │   ├── context/      # React context (AuthContext)
│   │   ├── services/     # Supabase client
│   │   └── index.css     # Global styles
│   └── package.json
├── backend/              # Express API server
│   ├── index.js         # Main server file
│   └── package.json
├── database/
│   ├── migrations/      # SQL schema setup
│   └── seed/           # Sample quiz data
└── README.md           # Full documentation
```

## Key Features to Demonstrate

1. **Landing Page**: Professional homepage with hero section and categories
2. **Authentication**: Secure signup/login with Supabase
3. **Dashboard**: Personalized stats and growth tracking
4. **Quiz Explorer**: Browse and filter quizzes by category/difficulty
5. **Quiz Engine**: Timed quizzes with progress tracking
6. **Results**: Score display with answer review
7. **Leaderboard**: Competitive rankings
8. **Profile**: User stats and quiz history
9. **Pricing**: Subscription plans (demo mode)
10. **Feedback**: User feedback form
11. **Contact**: Support request form

## Environment Variables Reference

### Frontend (.env)
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon public key
- `VITE_API_URL`: Backend API URL (http://localhost:5000)
- `VITE_SUPPORT_EMAIL`: Support email for contact page

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `FRONTEND_URL`: Frontend URL for CORS (http://localhost:5173)

## Security Notes

- Never commit `.env` files with real secrets
- Service role key should only be used on the backend
- Row Level Security (RLS) protects user data in the database
- Public quizzes are readable by anyone, user data is private

## Next Steps

1. Explore the codebase to understand the architecture
2. Customize the design by modifying `frontend/src/index.css`
3. Add more quiz questions in the Supabase SQL Editor
4. Implement real payment integration for subscriptions
5. Add email notifications for feedback/support requests
6. Create an admin interface for content management

## Support

For detailed documentation, see `README.md`

For Supabase-specific issues, check the [Supabase documentation](https://supabase.com/docs)

---

Built with ❤️ for learning and demonstration.
