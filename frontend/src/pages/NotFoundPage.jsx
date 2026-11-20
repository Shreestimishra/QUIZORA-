import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card p-5 text-center">
            <h1 className="display-1 fw-bold text-accent mb-3">404</h1>
            <h2 className="h3 fw-bold text-primary mb-3">Page Not Found</h2>
            <p className="text-secondary lead mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/" className="btn btn-primary">
                <Home className="me-2" size={20} />
                Go Home
              </Link>
              <button
                className="btn btn-outline-secondary"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="me-2" size={20} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
