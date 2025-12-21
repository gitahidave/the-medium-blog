import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as LoginRoute } from './routes/login'
import { Route as NewRoute } from './routes/new'
import { Route as PostRoute } from './routes/post.$postId'
import { Route as EditRoute } from './routes/edit.$postId'

const IndexRouteWithChildren = IndexRoute
const LoginRouteWithChildren = LoginRoute
const NewRouteWithChildren = NewRoute
const PostRouteWithChildren = PostRoute
const EditRouteWithChildren = EditRoute

const routeTree = rootRoute.addChildren([
  IndexRouteWithChildren,
  LoginRouteWithChildren,
  NewRouteWithChildren,
  PostRouteWithChildren,
  EditRouteWithChildren
])

export { routeTree }
