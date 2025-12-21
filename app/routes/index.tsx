import { createFileRoute, Link } from '@tanstack/react-router'
import { useBlog } from '../../app/contexts/BlogContext'
import { useAuth } from '../../app/contexts/AuthContext'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { posts } = useBlog()
  const { user, isAdmin } = useAuth()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Echo It Blog</h1>
        <p className="hero-subtitle">
          Thoughts, stories, and ideas from the community
        </p>
        {user && (
          <Link to="/new" className="btn-primary">
            Write a Post
          </Link>
        )}
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet. {user ? 'Be the first to write one!' : 'Login to create posts.'}</p>
          </div>
        ) : (
          posts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-card-header">
                <h2 className="post-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <div className="post-meta">
                  <span className="post-author">{post.author}</span>
                  <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
              </div>
              <p className="post-excerpt">
                {post.content.slice(0, 200)}
                {post.content.length > 200 && '...'}
              </p>
              <div className="post-card-footer">
                <Link to={`/post/${post.id}`} className="read-more">
                  Read More →
                </Link>
                {(user?.id === post.authorId || isAdmin) && (
                  <Link to={`/edit/${post.id}`} className="edit-link">
                    Edit
                  </Link>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}