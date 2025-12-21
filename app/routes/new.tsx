import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useBlog } from '~/contexts/BlogContext'
import { useAuth } from '~/contexts/AuthContext'

export const Route = createFileRoute('/new')({
  component: NewPostComponent,
})

function NewPostComponent() {
  const { addPost } = useBlog()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  if (!user) {
    navigate({ to: '/login' })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addPost({
      title,
      content,
      author: user.username,
      authorId: user.id
    })

    navigate({ to: '/' })
  }

  return (
    <div className="editor-page">
      <div className="editor-container">
        <h1 className="editor-title">Create New Post</h1>
        
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
            <button type="button" onClick={() => navigate({ to: '/' })} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
