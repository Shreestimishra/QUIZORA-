# QUIZORA - Online Quiz Gaming Platform

Think Fast. Play Smart. Rise to the Top.

A complete, polished, fully functional online quiz gaming platform built with React, Express, and Supabase.

## Features

### Core Features
- **User Authentication**: Secure registration and login using Supabase Auth
- **Quiz Categories**: 8 categories including Science, Technology, Mathematics, and more
- **Quiz Engine**: Complete timed quiz system with progress tracking
- **Instant Feedback**: Real-time scoring and answer review
- **Leaderboard**: Competitive rankings based on quiz performance
- **User Dashboard**: Personalized statistics and growth tracking
- **Profile Management**: Edit profile and view quiz history

### Additional Pages & Features
- **Settings Page**: Account settings, notification preferences, app preferences, and security settings
- **Help Center**: Comprehensive help articles organized by category with search functionality
- **About Page**: Company mission, values, team information, and milestones
- **Privacy Policy**: Detailed privacy policy explaining data collection and usage
- **Terms of Service**: Complete terms of service outlining user rights and responsibilities
- **Enhanced Feedback**: Subcategories, attachment links, and detailed feedback options
- **Subscription Plans**: Free, Plus, and Pro tiers with demonstration mode
- **Contact Support**: Support request management with multiple issue categories
- **Gen Z Brand Voice**: Modern, conversational microcopy throughout
- **Growth Tracking**: Personal improvement analytics and recommendations

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Bootstrap 5
- React Bootstrap
- Lucide React (icons)
- Recharts (charts)
- Supabase Client

### Backend
- Node.js
- Express.js
- Supabase Client

### Database
- Supabase PostgreSQL
- Row Level Security (RLS)
- Auth

## Project Structure

```
quiz app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context providers
│   │   ├── services/       # API and external services
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── .env                # Environment variables
│   └── package.json
├── backend/
│   ├── index.js            # Main server file
│   ├── .env                # Environment variables
│   └── package.json
├── database/
│   ├── migrations/         # SQL migration files
│   └── seed/              # Sample data scripts
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (free tier works)

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes 1-2 minutes)
3. Go to Project Settings > API
4. Copy the following:
   - Project URL
   - anon public key
   - service_role key (for backend only)

### 2. Database Setup

1. Go to the Supabase SQL Editor
2. Run the migration file: `database/migrations/001_initial_schema.sql`
3. Run the additional migration: `database/migrations/002_add_feedback_fields.sql`
4. Run the seed file: `database/seed/001_sample_data.sql`

This will create all necessary tables, indexes, RLS policies, and sample quiz data.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
VITE_SUPPORT_EMAIL=support@quizora.example
```

### 4. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FRONTEND_URL=http://localhost:5173
```

### 5. Running the Application

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

### 6. Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
The backend is production-ready with `npm start`.

## Environment Variables

### Frontend (.env)
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon public key
- `VITE_API_URL`: Backend API URL
- `VITE_SUPPORT_EMAIL`: Support email address (optional)

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `FRONTEND_URL`: Frontend URL for CORS

## Database Schema

### Tables
- `profiles`: User profiles linked to Supabase auth
- `categories`: Quiz categories
- `quizzes`: Quiz information
- `questions`: Quiz questions and answers
- `quiz_attempts`: User quiz attempts and scores
- `feedback`: User feedback submissions
- `support_requests`: Support request tickets

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public read access for published quizzes
- Service role key required for server operations

## Authentication

QUIZORA uses Supabase Auth for:
- User registration with email/password
- Secure login/logout
- Session management
- Protected routes

## Quiz Engine

The quiz engine features:
- Timed quizzes with countdown timer
- Progress tracking
- Answer selection and review
- Server-side score validation
- Attempt history storage
- Answer review with explanations

## Subscription System

**Note**: Payment integration is in demonstration mode. No real charges will be made.

### Plans
- **Free Mode**: ₹0 forever - Basic features
- **Plus Mode**: ₹149/month - Enhanced features
- **Pro Mode**: ₹299/month - Advanced features

To enable real payments:
1. Configure a payment provider (Stripe, Razorpay, etc.)
2. Set up webhooks for payment verification
3. Update subscription logic in backend
4. Add secure checkout flow

## Testing

Run the frontend build to check for errors:
```bash
cd frontend
npm run build
```

Test the following scenarios:
1. Registration and login
2. Quiz selection and gameplay
3. Score calculation and results
4. Leaderboard display
5. Profile updates
6. Feedback submission
7. Support request submission

## Important Notes

### Security
- Never commit `.env` files with real secrets
- Use environment variables for all sensitive data
- Service role key should only be used on the server
- RLS policies protect user data
- Never expose service role key to the frontend

### Limitations
- Payment integration is in demo mode (no real charges)
- Email notifications not configured
- Admin interface not fully implemented
- Some advanced analytics features are placeholders

## Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables in the deployment platform
3. Deploy automatically on push

### Backend (Render/Railway/Heroku)
1. Connect your repository
2. Set environment variables
3. Deploy

### Database
- Supabase handles database hosting
- No additional deployment needed

## College Presentation Demo Script

1. **Landing Page**: Show the homepage, categories, and features
2. **Registration**: Create a new account
3. **Dashboard**: Show personalized statistics and growth tracking
4. **Quiz Explorer**: Browse and filter quizzes
5. **Quiz Setup**: Show quiz details before starting
6. **Live Quiz**: Complete a quiz with timer
7. **Results**: Show score, answer review, and feedback
8. **Leaderboard**: Show competitive rankings
9. **Profile**: Display user stats and history
10. **Settings**: Demonstrate account settings, notifications, and preferences
11. **Help Center**: Show help articles and search functionality
12. **About**: Display company mission, values, and team
13. **Pricing**: Show subscription plans (demo mode)
14. **Feedback**: Submit detailed feedback with subcategories
15. **Contact**: Submit support request
16. **Privacy Policy**: Show comprehensive privacy policy
17. **Terms of Service**: Display terms and conditions

## Important React Concepts for Viva

1. **Component Architecture**: Reusable components, props, state
2. **React Router**: Client-side routing, protected routes
3. **Context API**: Global state management (AuthContext)
4. **Hooks**: useState, useEffect, useRef, custom hooks
5. **Forms**: Form validation, controlled components
6. **API Integration**: Supabase client, async/await
7. **Event Handling**: User interactions, form submissions
8. **State Management**: Local state vs context state
9. **Lifecycle Methods**: useEffect for component lifecycle
10. **Error Handling**: Try-catch, error boundaries
11. **Authentication**: Session management, protected routes
12. **Database Operations**: CRUD operations with Supabase
13. **Security**: RLS policies, environment variables
14. **Responsive Design**: Bootstrap grid, mobile-first approach
15. **Performance**: Lazy loading, optimization techniques

## Support

For issues or questions:
- Check the Supabase dashboard for database errors
- Review browser console for frontend errors
- Check backend logs for API errors
- Ensure all environment variables are set correctly

## License

This project is for educational purposes. Use it responsibly.

---

Built with ❤️ for learning and demonstration.
