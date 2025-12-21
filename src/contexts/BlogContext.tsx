import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  createdAt: string
  updatedAt: string
}

interface BlogContextType {
  posts: BlogPost[]
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePost: (id: string, post: Partial<BlogPost>) => void
  deletePost: (id: string) => void
  getPost: (id: string) => BlogPost | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Load posts from localStorage
    const storedPosts = localStorage.getItem('blogPosts')
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    } else {
      // Initialize with sample posts
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'Getting Started with React 19',
          content: 'React 19 introduces amazing new features including the new React Compiler, improved server components, and enhanced actions. In this post, we\'ll explore what makes React 19 special and how to get started with these powerful new capabilities.',
          author: 'admin',
          authorId: '1',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'TanStack Start: The Modern Full-Stack Framework',
          content: 'TanStack Start brings the power of TanStack Router to full-stack applications. Built on top of Vinxi and Nitro, it provides a robust foundation for building modern web applications with type-safe routing and server functions.',
          author: 'user',
          authorId: '2',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
      setPosts(samplePosts)
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts))
    }
  }, [])

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts)
    localStorage.setItem('blogPosts', JSON.stringify(newPosts))
  }

  const addPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    savePosts([newPost, ...posts])
  }

  const updatePost = (id: string, updatedData: Partial<BlogPost>) => {
    const newPosts = posts.map(post =>
      post.id === id
        ? { ...post, ...updatedData, updatedAt: new Date().toISOString() }
        : post
    )
    savePosts(newPosts)
  }

  const deletePost = (id: string) => {
    const newPosts = posts.filter(post => post.id !== id)
    savePosts(newPosts)
  }

  const getPost = (id: string) => {
    return posts.find(post => post.id === id)
  }

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}
