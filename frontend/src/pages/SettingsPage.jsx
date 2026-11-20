import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user, profile, updateProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: profile?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    quizReminders: true,
    updates: false,
    marketing: false,
  });
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    difficulty: 'medium',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage('');
    try {
      await updateProfile({ full_name: formData.fullName });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setMessage('Notification preferences saved!');
    }, 500);
  };

  const handleSavePreferences = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setMessage('Preferences saved!');
    }, 500);
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      alert('Account deletion requires contacting support. Please reach out to support@quizora.example');
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ];

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2">Settings</h1>
        <p className="text-secondary">Manage your account and preferences</p>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card p-3">
            <div className="list-group">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`list-group-item text-start ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="me-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mb-4`}>
              {message}
            </div>
          )}

          {activeTab === 'account' && (
            <div className="card p-4">
              <h2 className="h4 fw-bold text-primary mb-4">Account Settings</h2>

              <div className="mb-4">
                <label className="form-label text-secondary">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  disabled
                />
                <small className="text-secondary">Contact support to change email</small>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Subscription</label>
                <div className="bg-secondary p-3 rounded">
                  <span className="text-primary fw-bold">{profile?.subscription_tier || 'Free'}</span>
                  <Link to="/pricing" className="btn btn-outline-primary btn-sm ms-3">
                    Upgrade
                  </Link>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Member Since</label>
                <p className="text-secondary">{new Date(user?.created_at).toLocaleDateString()}</p>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-4">
              <h2 className="h4 fw-bold text-primary mb-4">Notification Preferences</h2>

              <div className="mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="email"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="email">
                    Email Notifications
                  </label>
                </div>
                <small className="text-secondary">Receive important updates via email</small>
              </div>

              <div className="mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="quizReminders"
                    checked={notifications.quizReminders}
                    onChange={(e) => setNotifications({ ...notifications, quizReminders: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="quizReminders">
                    Quiz Reminders
                  </label>
                </div>
                <small className="text-secondary">Get reminded to practice daily</small>
              </div>

              <div className="mb-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="updates"
                    checked={notifications.updates}
                    onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="updates">
                    Product Updates
                  </label>
                </div>
                <small className="text-secondary">New features and improvements</small>
              </div>

              <div className="mb-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="marketing"
                    checked={notifications.marketing}
                    onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="marketing">
                    Marketing Emails
                  </label>
                </div>
                <small className="text-secondary">Promotions and special offers</small>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleSaveNotifications}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card p-4">
              <h2 className="h4 fw-bold text-primary mb-4">App Preferences</h2>

              <div className="mb-4">
                <label className="form-label text-secondary">Theme</label>
                <select
                  className="form-select"
                  value={preferences.theme}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Language</label>
                <select
                  className="form-select"
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Default Quiz Difficulty</label>
                <select
                  className="form-select"
                  value={preferences.difficulty}
                  onChange={(e) => setPreferences({ ...preferences, difficulty: e.target.value })}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleSavePreferences}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-4">
              <h2 className="h4 fw-bold text-primary mb-4">Security Settings</h2>

              <div className="mb-4">
                <label className="form-label text-secondary">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <button className="btn btn-primary mb-4">Update Password</button>

              <hr className="border-secondary my-4" />

              <h3 className="h5 fw-bold text-primary mb-3">Danger Zone</h3>
              <p className="text-secondary mb-3">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="btn btn-danger" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
