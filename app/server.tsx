import { renderToString } from 'react-dom/server'
import { StartServer } from '@tanstack/react-start-server'
import { createRouter } from './router'

export async function render(url: string) {
  const router = createRouter()

  const html = renderToString(<StartServer router={router} url={url} />)

  return { html }
}
