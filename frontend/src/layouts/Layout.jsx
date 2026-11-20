import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            QUIZORA
          </Link>

          <button
            className="navbar-toggler bg-light"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/quizzes" className={`nav-link ${location.pathname === '/quizzes' ? 'active' : ''}`}>
                  Explore Quizzes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/leaderboard" className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}>
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                  About
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-lg-3">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-primary btn-sm ms-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-primary btn-sm ms-2">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-secondary py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="text-primary mb-3">QUIZORA</h5>
              <p className="text-secondary mb-2">Think Fast. Play Smart. Rise to the Top.</p>
              <p className="text-secondary">Your next big win starts with one question.</p>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-4 mb-3">
                  <h6 className="text-primary mb-2">Platform</h6>
                  <ul className="list-unstyled">
                    <li className="mb-1">
                      <Link to="/quizzes" className="text-secondary">Explore Quizzes</Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/leaderboard" className="text-secondary">Leaderboard</Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/pricing" className="text-secondary">Pricing</Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/about" className="text-secondary">About</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-4 mb-3">
                  <h6 className="text-primary mb-2">Support</h6>
                  <ul className="list-unstyled">
                    <li className="mb-1">
                      <Link to="/help" className="text-secondary">Help Center</Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/feedback" className="text-secondary">Feedback</Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/contact" className="text-secondary">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-4 mb-3">
                  <h6 className="text-primary mb-2">Legal</h6>
                  <ul className="list-unstyled">
                    <li className="mb-1">
                      <Link to="/privacy" className="text-secondary">Privacy Policy</Link>
                    </li>
                    <li className="mb-1">
                      <Link to="/terms" className="text-secondary">Terms of Service</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-secondary my-3" />
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-secondary mb-0">© 2024 QUIZORA. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="/privacy" className="text-secondary me-3">Privacy Policy</Link>
              <Link to="/terms" className="text-secondary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
