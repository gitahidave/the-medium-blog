import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as LoginRoute } from './routes/login'
import { Route as WriteRoute } from './routes/write'
import { Route as StoryRoute } from './routes/story.$storyId'
import { Route as EditRoute } from './routes/edit.$storyId'

const IndexRouteWithChildren = IndexRoute
const LoginRouteWithChildren = LoginRoute
const WriteRouteWithChildren = WriteRoute
const StoryRouteWithChildren = StoryRoute
const EditRouteWithChildren = EditRoute

const routeTree = rootRoute.addChildren([
  IndexRouteWithChildren,
  LoginRouteWithChildren,
  WriteRouteWithChildren,
  StoryRouteWithChildren,
  EditRouteWithChildren
])

export { routeTree }
