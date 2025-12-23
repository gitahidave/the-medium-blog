import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isAdmin: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const USERS = [
  { 
    id: '1', 
    username: 'admin', 
    email: 'admin@medium.com',
    password: 'admin123', 
    role: 'admin' as const,
    avatar: '👨‍💼',
    bio: 'Platform administrator and content curator'
  },
  { 
    id: '2', 
    username: 'writer', 
    email: 'writer@medium.com',
    password: 'writer123', 
    role: 'user' as const,
    avatar: '✍️',
    bio: 'Passionate writer sharing stories and insights'
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('medium_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(
      u => u.username === username && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser
      setUser(userData)
      localStorage.setItem('medium_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('medium_user')
  }

  const isAdmin = user?.role === 'admin'
  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
