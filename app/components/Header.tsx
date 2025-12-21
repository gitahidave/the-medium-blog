import { Link } from '@tanstack/react-router'
import { useAuth } from '~/contexts/AuthContext'

export function Header() {
  const { user, logout, isAdmin } = useAuth()

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">ModernBlog</span>
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <Link to="/new" className="nav-link">
                New Post
              </Link>
              <div className="user-menu">
                <span className="user-badge">
                  {user.username}
                  {isAdmin && <span className="admin-badge">Admin</span>}
                </span>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
