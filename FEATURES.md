# ModernBlog - Feature Overview

## 🎨 Design Highlights

### Editorial Aesthetic
- Custom serif typography (Crimson Pro) for a magazine-quality feel
- Warm, sophisticated color palette (browns, terracotta, cream)
- Generous spacing and clean layouts
- Smooth animations and transitions

### Key Design Elements
- Rotating logo icon (✦)
- Staggered post card animations on load
- Hover effects on cards and links
- Gradient background effects
- Professional modal dialogs

## 🔐 Authentication System

### User Roles
1. **Anonymous** - Can view posts only
2. **Regular User** - Can create and edit own posts
3. **Admin** - Full control (edit/delete any post)

### Features
- Persistent login via localStorage
- Role-based permissions
- Protected routes
- User badge in header showing role

## 📝 Blog Management

### Post Operations

#### Creating Posts
- Click "New Post" in header (requires login)
- Fill in title and content
- Auto-saves author information
- Timestamp tracking

#### Editing Posts
- Users can edit their own posts
- Admins can edit any post
- "Edit" link appears on cards and detail pages
- Updates timestamp on save

#### Deleting Posts
- Admin-only feature
- Confirmation modal before deletion
- Permanently removes post

#### Viewing Posts
- Home page shows all posts in card grid
- Click "Read More" for full post
- Author and date information
- Clean, readable layout

## 🛣️ Application Routes

```
/              → Home (post list)
/login         → Login page
/new           → Create new post (auth required)
/post/:id      → View post detail
/edit/:id      → Edit post (auth + permissions required)
```

## 🎯 User Flows

### First-Time Visitor
1. Lands on home page
2. Sees existing posts
3. Can read any post
4. Must login to create posts

### Logged-In User
1. Sees "New Post" button in header
2. Can create unlimited posts
3. Edit button appears on own posts
4. Can logout anytime

### Admin User
1. All user capabilities, plus:
2. Edit button on ALL posts
3. Delete button on post detail pages
4. Special "Admin" badge in header

## 💾 Data Storage

All data is stored in browser localStorage:
- `user` - Current logged-in user
- `blogPosts` - Array of all posts

This persists across:
- Page refreshes
- Browser restarts
- Navigation

## 🎭 Sample Content

The app initializes with two sample posts:
1. "Getting Started with React 19" (by admin)
2. "TanStack Start: The Modern Full-Stack Framework" (by user)

## 🚀 Quick Start Guide

### 1. Install & Run
```bash
cd the-medium-blog
npm install
npm run dev
```

### 2. Login
Use demo credentials:
- **Admin**: admin / admin123
- **User**: user / user123

### 3. Create Your First Post
1. Click "New Post" in header
2. Write title and content
3. Click "Publish Post"

### 4. Explore Features
- Edit your post
- Try admin features (login as admin)
- Delete posts (admin only)
- Logout and view as anonymous user

## 🏗️ Technical Architecture

### Context Providers
```
AuthProvider (wraps entire app)
  └── BlogProvider (wraps entire app)
      └── Router with all routes
```

### State Management
- **AuthContext**: Manages user authentication
- **BlogContext**: Manages blog posts CRUD
- **useState/useEffect**: Local component state

### Component Hierarchy
```
Root
├── Header (always visible)
└── Route Content
    ├── Home (post grid)
    ├── Login (auth form)
    ├── New Post (editor)
    ├── Edit Post (editor)
    └── Post Detail (reader)
```

## 🎨 Customization Tips

### Change Color Scheme
Edit CSS variables in `app/styles.css`:
```css
:root {
  --color-primary: #2c1810;    /* Main brand color */
  --color-accent: #d4722b;     /* Accent color */
  --color-bg: #faf8f5;         /* Background */
}
```

### Change Typography
Update font imports in `app/styles.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');

:root {
  --font-display: 'YourFont', serif;
  --font-body: 'YourFont', sans-serif;
}
```

### Add New Features
1. Create new route in `app/routes/`
2. Add to `routeTree.gen.ts`
3. Update contexts if needed
4. Add navigation links in Header

## 📱 Responsive Design

The app is fully responsive:
- **Desktop** (>768px): Multi-column grid layout
- **Mobile** (<768px): Single-column stacked layout
- Touch-friendly buttons and inputs
- Optimized typography scaling

## ⚡ Performance Features

- Client-side routing (instant navigation)
- Optimized animations (CSS-only)
- Minimal re-renders via Context
- LocalStorage caching
- Lazy-loaded routes
