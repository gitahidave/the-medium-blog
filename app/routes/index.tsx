import { createFileRoute } from '@tanstack/react-router'
import { useStories } from '~/contexts/StoryContext'
import { StoryCard } from '~/components/StoryCard'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { stories } = useStories()

  const featuredStory = stories[0]
  const otherStories = stories.slice(1)

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Stay curious.</h1>
        <p className="hero-subtitle">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      <div className="home-content">
        <main className="main-feed">
          {featuredStory && (
            <div className="featured-section">
              <StoryCard story={featuredStory} variant="featured" />
            </div>
          )}

          <div className="stories-feed">
            {otherStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {stories.length === 0 && (
            <div className="empty-state">
              <p>No stories yet. Be the first to write one!</p>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Discover more of what matters to you</h3>
            <div className="tags-cloud">
              {['Web Development', 'Technology', 'Design', 'UX', 'Writing', 'Product', 'Career', 'Programming'].map(tag => (
                <button key={tag} className="tag-pill">{tag}</button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Recommended topics</h3>
            <div className="topics-list">
              {['React', 'JavaScript', 'Design Systems', 'Leadership', 'Productivity'].map(topic => (
                <div key={topic} className="topic-item">{topic}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
