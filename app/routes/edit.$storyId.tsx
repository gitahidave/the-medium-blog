import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useStories } from '~/contexts/StoryContext'
import { useAuth } from '~/contexts/AuthContext'

export const Route = createFileRoute('/edit/$storyId')({
  component: EditStoryComponent,
})

function EditStoryComponent() {
  const { storyId } = Route.useParams()
  const { getStory, updateStory } = useStories()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const story = getStory(storyId)
    
    if (!story) {
      navigate({ to: '/' })
      return
    }

    if (!user) {
      navigate({ to: '/login' })
      return
    }

    if (user.id !== story.authorId && !isAdmin) {
      navigate({ to: '/' })
      return
    }

    setTitle(story.title)
    setSubtitle(story.subtitle)
    setContent(story.content)
    setTags(story.tags.join(', '))
    setLoading(false)
  }, [storyId, user, isAdmin, getStory, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const wordCount = content.trim().split(/\s+/).length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    updateStory(storyId, {
      title,
      subtitle,
      content,
      readTime,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    })

    navigate({ to: `/story/${storyId}` })
  }

  if (loading) {
    return <div className="loading">Loading...</div>
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
            <button type="button" onClick={() => navigate({ to: `/story/${storyId}` })} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
