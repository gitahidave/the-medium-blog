import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Story {
  id: string
  title: string
  subtitle: string
  content: string
  author: string
  authorId: string
  authorAvatar: string
  readTime: number
  tags: string[]
  claps: number
  publishedAt: string
  updatedAt: string
}

interface StoryContextType {
  stories: Story[]
  addStory: (story: Omit<Story, 'id' | 'claps' | 'publishedAt' | 'updatedAt'>) => void
  updateStory: (id: string, story: Partial<Story>) => void
  deleteStory: (id: string) => void
  getStory: (id: string) => Story | undefined
  clapStory: (id: string) => void
  getStoriesByTag: (tag: string) => Story[]
}

const StoryContext = createContext<StoryContextType | undefined>(undefined)

const SAMPLE_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2025',
    subtitle: 'Exploring React 19, TanStack Start, and the next generation of full-stack frameworks',
    content: `The landscape of web development is evolving at an unprecedented pace. With React 19's revolutionary compiler and TanStack Start's innovative approach to full-stack development, we're witnessing a paradigm shift in how we build modern applications.

React 19 introduces automatic memoization through its new compiler, eliminating the need for manual useMemo and useCallback hooks. This breakthrough means developers can write cleaner, more intuitive code while maintaining optimal performance.

TanStack Start builds on this foundation by providing a type-safe, file-based routing system that feels natural and powerful. Combined with server functions that eliminate the traditional API layer, we're moving toward a future where the boundary between client and server becomes increasingly transparent.

The implications are profound. Teams can move faster, maintain less code, and deliver better user experiences. As these technologies mature, we're likely to see a new wave of applications that were previously impractical to build.`,
    author: 'writer',
    authorId: '2',
    authorAvatar: '✍️',
    readTime: 5,
    tags: ['Web Development', 'React', 'Technology'],
    claps: 142,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Building Better User Experiences',
    subtitle: 'Design principles that create delightful, intuitive interfaces',
    content: `Great user experience isn't about flashy animations or trendy designs—it's about understanding human behavior and creating interfaces that feel natural and effortless.

The best interfaces are invisible. Users shouldn't need to think about how to accomplish their goals. Every interaction should feel predictable yet delightful, guiding users toward success without friction.

Typography matters more than most designers realize. The right typeface, properly sized and spaced, can dramatically improve readability and comprehension. It's not just about aesthetics; it's about communication.

White space is your ally. Cramming more features onto a screen doesn't make a better product—it makes a more confusing one. Strategic use of negative space creates hierarchy, improves focus, and makes interfaces feel premium.

Performance is a feature. Users notice when things feel slow, even if it's just a few hundred milliseconds. Smooth animations, instant feedback, and thoughtful loading states make applications feel responsive and polished.

The future of UX lies in understanding that technology should adapt to humans, not the other way around.`,
    author: 'admin',
    authorId: '1',
    authorAvatar: '👨‍💼',
    readTime: 4,
    tags: ['Design', 'UX', 'Product'],
    claps: 89,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'The Art of Technical Writing',
    subtitle: 'How to explain complex concepts with clarity and precision',
    content: `Writing about technology is both an art and a science. The goal isn't to impress readers with jargon—it's to make complex ideas accessible and actionable.

Start with why. Before diving into how something works, explain why it matters. Context gives readers a reason to care and a framework for understanding the details that follow.

Use examples liberally. Abstract concepts become concrete when illustrated with real-world scenarios. Show, don't just tell. A well-chosen example can illuminate an idea faster than paragraphs of explanation.

Break down complexity. Take intimidating concepts and decompose them into digestible pieces. Build understanding incrementally, ensuring readers master fundamentals before moving to advanced topics.

Edit ruthlessly. First drafts are rarely great. Remove unnecessary words, clarify ambiguous statements, and reorganize for flow. Every sentence should serve a purpose.

Remember your audience. Are you writing for beginners or experts? Adjust your language, depth, and assumptions accordingly. The best technical writing meets readers where they are.`,
    author: 'writer',
    authorId: '2',
    authorAvatar: '✍️',
    readTime: 3,
    tags: ['Writing', 'Communication', 'Career'],
    claps: 67,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export function StoryProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const storedStories = localStorage.getItem('medium_stories')
    if (storedStories) {
      setStories(JSON.parse(storedStories))
    } else {
      setStories(SAMPLE_STORIES)
      localStorage.setItem('medium_stories', JSON.stringify(SAMPLE_STORIES))
    }
  }, [])

  const saveStories = (newStories: Story[]) => {
    setStories(newStories)
    localStorage.setItem('medium_stories', JSON.stringify(newStories))
  }

  const addStory = (story: Omit<Story, 'id' | 'claps' | 'publishedAt' | 'updatedAt'>) => {
    const newStory: Story = {
      ...story,
      id: Date.now().toString(),
      claps: 0,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    saveStories([newStory, ...stories])
  }

  const updateStory = (id: string, updatedData: Partial<Story>) => {
    const newStories = stories.map(story =>
      story.id === id
        ? { ...story, ...updatedData, updatedAt: new Date().toISOString() }
        : story
    )
    saveStories(newStories)
  }

  const deleteStory = (id: string) => {
    const newStories = stories.filter(story => story.id !== id)
    saveStories(newStories)
  }

  const getStory = (id: string) => {
    return stories.find(story => story.id === id)
  }

  const clapStory = (id: string) => {
    const newStories = stories.map(story =>
      story.id === id ? { ...story, claps: story.claps + 1 } : story
    )
    saveStories(newStories)
  }

  const getStoriesByTag = (tag: string) => {
    return stories.filter(story => story.tags.includes(tag))
  }

  return (
    <StoryContext.Provider value={{ 
      stories, 
      addStory, 
      updateStory, 
      deleteStory, 
      getStory, 
      clapStory,
      getStoriesByTag 
    }}>
      {children}
    </StoryContext.Provider>
  )
}

export function useStories() {
  const context = useContext(StoryContext)
  if (context === undefined) {
    throw new Error('useStories must be used within a StoryProvider')
  }
  return context
}
