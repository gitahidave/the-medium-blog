import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AuthProvider } from '~/contexts/AuthContext'
import { BlogProvider } from '~/contexts/BlogContext'
import { Header } from '~/components/Header'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <BlogProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </BlogProvider>
    </AuthProvider>
  )
}
