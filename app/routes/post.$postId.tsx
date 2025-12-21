import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useBlog } from '~/contexts/BlogContext'
import { useAuth } from '~/contexts/AuthContext'

export const Route = createFileRoute('/post/$postId')({
  component: PostDetailComponent,
})

function PostDetailComponent() {
  const { postId } = Route.useParams()
  const { getPost, deletePost } = useBlog()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(getPost(postId))
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const foundPost = getPost(postId)
    if (!foundPost) {
      navigate({ to: '/' })
    } else {
      setPost(foundPost)
    }
  }, [postId, getPost, navigate])

  if (!post) {
    return <div className="loading">Loading...</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = () => {
    deletePost(postId)
    navigate({ to: '/' })
  }

  const canEdit = user?.id === post.authorId || isAdmin
  const canDelete = isAdmin

  return (
    <div className="post-detail">
      <article className="post-article">
        <header className="post-header">
          <Link to="/" className="back-link">← Back to All Posts</Link>
          
          <h1 className="post-detail-title">{post.title}</h1>
          
          <div className="post-detail-meta">
            <span className="author-badge">{post.author}</span>
            <time className="post-timestamp">
              Published {formatDate(post.createdAt)}
            </time>
            {post.updatedAt !== post.createdAt && (
              <time className="post-timestamp updated">
                Updated {formatDate(post.updatedAt)}
              </time>
            )}
          </div>
        </header>

        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {(canEdit || canDelete) && (
          <footer className="post-actions">
            {canEdit && (
              <Link to={`/edit/${post.id}`} className="btn-secondary">
                Edit Post
              </Link>
            )}
            {canDelete && (
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="btn-danger"
              >
                Delete Post
              </button>
            )}
          </footer>
        )}
      </article>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Post?</h2>
            <p>Are you sure you want to delete "{post.title}"? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
