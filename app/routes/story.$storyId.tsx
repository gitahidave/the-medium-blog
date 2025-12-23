import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useStories } from '~/contexts/StoryContext'
import { useAuth } from '~/contexts/AuthContext'

export const Route = createFileRoute('/story/$storyId')({
  component: StoryDetailComponent,
})

function StoryDetailComponent() {
  const { storyId } = Route.useParams()
  const { getStory, deleteStory, clapStory } = useStories()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [story, setStory] = useState(getStory(storyId))
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [hasClapped, setHasClapped] = useState(false)

  useEffect(() => {
    const foundStory = getStory(storyId)
    if (!foundStory) {
      navigate({ to: '/' })
    } else {
      setStory(foundStory)
    }
  }, [storyId, getStory, navigate])

  if (!story) {
    return <div className="loading">Loading...</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  }

  const handleDelete = () => {
    deleteStory(storyId)
    navigate({ to: '/' })
  }

  const handleClap = () => {
    if (!hasClapped) {
      clapStory(storyId)
      setHasClapped(true)
      setStory(prev => prev ? { ...prev, claps: prev.claps + 1 } : prev)
    }
  }

  const canEdit = user?.id === story.authorId || isAdmin
  const canDelete = isAdmin

  return (
    <div className="story-page">
      <article className="story-article">
        <header className="story-header">
          <h1 className="story-title">{story.title}</h1>
          {story.subtitle && (
            <p className="story-subtitle">{story.subtitle}</p>
          )}
          
          <div className="story-meta-bar">
            <div className="author-section">
              <span className="author-avatar">{story.authorAvatar}</span>
              <div className="author-details">
                <span className="author-name">{story.author}</span>
                <div className="meta-info">
                  <span>{formatDate(story.publishedAt)}</span>
                  <span>·</span>
                  <span>{story.readTime} min read</span>
                </div>
              </div>
            </div>

            <div className="story-actions">
              <button 
                onClick={handleClap} 
                className={`clap-btn ${hasClapped ? 'clapped' : ''}`}
                disabled={hasClapped}
              >
                <span className="clap-icon">👏</span>
                <span className="clap-count">{story.claps}</span>
              </button>
              {canEdit && (
                <Link to={`/edit/${story.id}`} className="edit-btn">
                  Edit
                </Link>
              )}
              {canDelete && (
                <button onClick={() => setShowDeleteConfirm(true)} className="delete-btn">
                  Delete
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="story-content">
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {story.tags.length > 0 && (
          <footer className="story-footer">
            <div className="story-tags">
              {story.tags.map(tag => (
                <Link key={tag} to={`/tag/${tag}`} className="tag">
                  {tag}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete story?</h2>
            <p>This action cannot be undone.</p>
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
