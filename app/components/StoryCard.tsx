import { Link } from '@tanstack/react-router'
import { Story } from '~/contexts/StoryContext'

interface StoryCardProps {
  story: Story
  variant?: 'featured' | 'list'
}

export function StoryCard({ story, variant = 'list' }: StoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (variant === 'featured') {
    return (
      <article className="story-card-featured">
        <div className="story-content">
          <div className="author-info">
            <span className="author-avatar">{story.authorAvatar}</span>
            <span className="author-name">{story.author}</span>
          </div>
          <Link to={`/story/${story.id}`} className="story-link">
            <h2 className="story-title">{story.title}</h2>
            <p className="story-subtitle">{story.subtitle}</p>
          </Link>
          <div className="story-meta">
            <span>{formatDate(story.publishedAt)}</span>
            <span>·</span>
            <span>{story.readTime} min read</span>
            <span>·</span>
            <span className="claps">👏 {story.claps}</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="story-card">
      <div className="story-card-content">
        <div className="author-info">
          <span className="author-avatar">{story.authorAvatar}</span>
          <span className="author-name">{story.author}</span>
        </div>
        <Link to={`/story/${story.id}`}>
          <h3 className="story-title">{story.title}</h3>
          <p className="story-subtitle">{story.subtitle}</p>
        </Link>
        <div className="story-footer">
          <div className="story-meta">
            <span>{formatDate(story.publishedAt)}</span>
            <span>·</span>
            <span>{story.readTime} min read</span>
          </div>
          <div className="story-tags">
            {story.tags.slice(0, 2).map(tag => (
              <Link key={tag} to={`/tag/${tag}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
