import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useStories } from '~/contexts/StoryContext'
import { useAuth } from '~/contexts/AuthContext'

export const Route = createFileRoute('/write')({
  component: WriteComponent,
})

function WriteComponent() {
  const { addStory } = useStories()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  if (!user) {
    navigate({ to: '/login' })
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const wordCount = content.trim().split(/\s+/).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    addStory({
      title,
      subtitle,
      content,
      author: user.username,
      authorId: user.id,
      authorAvatar: user.avatar || '👤',
      readTime,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    })

    navigate({ to: '/' })
  }

  return (
    <div className="write-page">
      <div className="write-container">
        <form onSubmit={handleSubmit} className="write-form">
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitle (optional)"
              className="subtitle-input"
            />
          </div>

          <div className="form-group">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
              rows={20}
              className="content-textarea"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags (comma-separated)"
              className="tags-input"
            />
          </div>

          <div className="write-actions">
            <button type="button" onClick={() => navigate({ to: '/' })} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
