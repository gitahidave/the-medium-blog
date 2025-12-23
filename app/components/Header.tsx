import { Link } from '@tanstack/react-router'
import { useAuth } from '~/contexts/AuthContext'

export function Header() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="2" fill="currentColor"/>
            <text x="20" y="28" fontSize="24" fontWeight="700" fill="white" textAnchor="middle">M</text>
          </svg>
          <span className="logo-text">Medium</span>
        </Link>

        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/write" className="nav-link write-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9h1m-1 4h6m-6 4h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Write
              </Link>
              <div className="user-menu">
                <div className="user-avatar">{user?.avatar || '👤'}</div>
                <div className="dropdown">
                  <span className="user-name">{user?.username}</span>
                  <button onClick={logout} className="logout-btn">Sign out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign in</Link>
              <Link to="/login" className="btn-primary">Get started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
