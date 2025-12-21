import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useBlog } from '~/contexts/BlogContext'
import { useAuth } from '~/contexts/AuthContext'

export const Route = createFileRoute('/edit/$postId')({
  component: EditPostComponent,
})

function EditPostComponent() {
  const { postId } = Route.useParams()
  const { getPost, updatePost } = useBlog()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const post = getPost(postId)
    
    if (!post) {
      navigate({ to: '/' })
      return
    }

    if (!user) {
      navigate({ to: '/login' })
      return
    }

    if (user.id !== post.authorId && !isAdmin) {
      navigate({ to: '/' })
      return
    }

    setTitle(post.title)
    setContent(post.content)
    setLoading(false)
  }, [postId, user, isAdmin, getPost, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    updatePost(postId, { title, content })
    navigate({ to: `/post/${postId}` })
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="editor-page">
      <div className="editor-container">
        <h1 className="editor-title">Edit Post</h1>
        
        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="title-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={15}
              className="content-textarea"
              required
            />
          </div>

          <div className="editor-actions">
            <button type="button" onClick={() => navigate({ to: `/post/${postId}` })} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
