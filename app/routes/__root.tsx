import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AuthProvider } from '~/contexts/AuthContext'
import { StoryProvider } from '~/contexts/StoryContext'
import { Header } from '~/components/Header'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <StoryProvider>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </StoryProvider>
    </AuthProvider>
  )
}
