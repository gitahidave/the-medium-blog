# ModernBlog - TanStack Start Blogging Application

A full-featured blogging application built with React 19 and TanStack Start, featuring authentication, role-based access control, and a beautiful editorial design aesthetic.

## Features

### Core Functionality
- **User Authentication**: Login system with user and admin roles
- **Create Posts**: Authenticated users can create new blog posts
- **Edit Posts**: Users can edit their own posts; admins can edit any post
- **Delete Posts**: Admins can delete any post
- **View Posts**: Public viewing of all blog posts

### Technical Features
- **React 19**: Latest React with modern hooks and patterns
- **TanStack Start**: Full-stack framework with file-based routing
- **Context API**: State management for auth and blog data
- **Custom Hooks**: `useAuth()` and `useBlog()` for clean component logic
- **LocalStorage**: Persistent data storage (simulates backend)
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first, fully responsive layout

### Design
- **Editorial Aesthetic**: Inspired by high-end magazine layouts
- **Custom Typography**: Crimson Pro (display) + Instrument Sans (body)
- **Warm Color Palette**: Brown, terracotta, and cream tones
- **Smooth Animations**: Staggered reveals, hover effects, and transitions
- **Professional UI**: Clean, sophisticated interface

## Getting Started

### Installation

```bash
cd blog-app
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Demo Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: Can edit and delete any post

### Regular User Account
- **Username**: `user`
- **Password**: `user123`
- **Permissions**: Can create and edit own posts

## Project Structure

```
blog-app/
├── app/
│   ├── routes/               # File-based routing
│   │   ├── __root.tsx        # Root layout with providers
│   │   ├── index.tsx         # Home page (post list)
│   │   ├── login.tsx         # Login page
│   │   ├── new.tsx           # Create new post
│   │   ├── edit.$postId.tsx  # Edit post
│   │   └── post.$postId.tsx  # Post detail view
│   ├── contexts/             # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── BlogContext.tsx   # Blog posts state
│   ├── components/           # Reusable components
│   │   └── Header.tsx        # Navigation header
│   ├── styles.css            # Global styles
│   ├── router.tsx            # Router configuration
│   ├── routeTree.gen.ts      # Generated route tree
│   ├── client.tsx            # Client entry point
│   └── server.tsx            # Server entry point
├── package.json
├── tsconfig.json
└── app.config.ts
```

## Architecture

### Authentication Layer
The app uses Context API for authentication:

```typescript
// AuthContext provides:
- user: User | null          // Current logged-in user
- login(username, password)  // Login function
- logout()                   // Logout function
- isAdmin: boolean           // Admin role check
```

### Blog Management
Blog posts are managed through BlogContext:

```typescript
// BlogContext provides:
- posts: BlogPost[]                    // All posts
- addPost(post)                        // Create new post
- updatePost(id, updates)              // Update post
- deletePost(id)                       // Delete post
- getPost(id)                          // Get single post
```

### Permissions System
- **Anonymous**: Can view all posts
- **Logged-in User**: Can create posts and edit their own posts
- **Admin**: Can edit and delete any post

### Data Persistence
- All data is stored in `localStorage`
- Auth state persists across sessions
- Blog posts persist across page refreshes
- Initial sample posts are created on first load

## Routes

- `/` - Home page with post list
- `/login` - Login page
- `/new` - Create new post (requires auth)
- `/post/:postId` - View post detail
- `/edit/:postId` - Edit post (requires auth + ownership/admin)

## Custom Hooks

### useAuth()
```typescript
const { user, login, logout, isAdmin } = useAuth()
```

### useBlog()
```typescript
const { posts, addPost, updatePost, deletePost, getPost } = useBlog()
```

## Design Philosophy

This application follows editorial design principles:
- **Typography-first**: Large, readable serif headings
- **Generous spacing**: Plenty of white space for readability
- **Subtle animations**: Smooth, purposeful transitions
- **Warm palette**: Inviting, sophisticated color scheme
- **Clean hierarchy**: Clear visual organization

## Technologies Used

- **React 19**: Latest React features
- **TanStack Start**: Full-stack React framework
- **TanStack Router**: Type-safe routing
- **TypeScript**: Type safety
- **Vinxi**: Build tool
- **CSS3**: Modern styling with custom properties

## Future Enhancements

Potential features to add:
- Backend API integration
- Database storage (PostgreSQL, MongoDB)
- Rich text editor (Tiptap, Draft.js)
- Image uploads
- Comments system
- Search functionality
- Tags and categories
- User profiles
- Password reset
- Email notifications

## License

MIT License - feel free to use this project as a template for your own applications!

## Contributing

This is a demonstration project. Feel free to fork and modify for your needs!
