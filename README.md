# Medium Blog - A TanStack Start Application

A Medium-inspired blogging platform built with React 19 and TanStack Start, featuring a refined editorial aesthetic and full-stack capabilities.

## ✨ Features

### Core Functionality
- **Story Publishing**: Write and publish stories with titles, subtitles, and rich content
- **User Authentication**: Secure login system with user and admin roles
- **Clapping System**: Medium-style appreciation mechanism for stories
- **Tag Management**: Organize stories with custom tags
- **Read Time Calculation**: Automatic reading time estimation
- **Edit & Delete**: Authors can edit their stories; admins can manage all content

### Technical Stack
- **React 19**: Latest React with enhanced features
- **TanStack Start**: Full-stack framework with type-safe routing
- **Context API**: Elegant state management
- **TypeScript**: Complete type safety
- **LocalStorage**: Persistent data (simulates backend)

### Design Philosophy
- **Editorial Aesthetic**: Inspired by Medium's refined, content-first design
- **Typography-First**: Lora serif for content, Source Sans 3 for UI
- **Signature Yellow**: Medium's iconic #FFC017 accent color
- **Minimalist UI**: Clean, distraction-free reading experience
- **Smooth Animations**: Subtle, purposeful transitions

## 🚀 Quick Start

### Installation

```bash
cd medium-blog
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Demo Accounts

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Capabilities**: Edit and delete any story

### Writer Account
- **Username**: `writer`
- **Password**: `writer123`
- **Capabilities**: Create and edit own stories

## 📁 Project Structure

```
medium-blog/
├── app/
│   ├── routes/                    # File-based routing
│   │   ├── __root.tsx             # Root layout with providers
│   │   ├── index.tsx              # Home page with story feed
│   │   ├── login.tsx              # Authentication page
│   │   ├── write.tsx              # Story editor
│   │   ├── story.$storyId.tsx     # Story reader
│   │   └── edit.$storyId.tsx      # Story editor (edit mode)
│   │
│   ├── contexts/                  # State management
│   │   ├── AuthContext.tsx        # Authentication state
│   │   └── StoryContext.tsx       # Story management
│   │
│   ├── components/                # Reusable components
│   │   ├── Header.tsx             # Navigation header
│   │   └── StoryCard.tsx          # Story preview card
│   │
│   ├── styles.css                 # Global styles
│   ├── router.tsx                 # Router configuration
│   ├── routeTree.gen.ts          # Generated route tree
│   ├── client.tsx                 # Client entry point
│   └── server.tsx                 # Server entry point
│
├── vite.config.ts                 # Vite configuration
├── app.config.ts                  # TanStack Start config
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies
```

## 🎨 Design System

### Colors
- **Background**: Pure white (#FFFFFF)
- **Text**: Near black (#242424)
- **Accent**: Medium yellow (#FFC017)
- **Success**: Medium green (#1A8917)
- **Borders**: Light gray (#F2F2F2)

### Typography
- **Display Font**: Lora (serif) - For titles and story content
- **Body Font**: Source Sans 3 (sans-serif) - For UI elements
- **Sizes**: Responsive from 14px (UI) to 106px (hero)

### Layout
- **Max Width**: 1192px (container), 680px (story content)
- **Spacing**: 8px grid system
- **Border Radius**: 99px (pills), 4px (inputs)

## 🏗️ Architecture

### Authentication Layer

```typescript
// AuthContext provides:
- user: User | null              // Current user
- login(username, password)      // Login function
- logout()                       // Logout function
- isAdmin: boolean               // Admin check
- isAuthenticated: boolean       // Auth status
```

### Story Management

```typescript
// StoryContext provides:
- stories: Story[]                     // All stories
- addStory(story)                      // Create story
- updateStory(id, updates)             // Update story
- deleteStory(id)                      // Delete story
- getStory(id)                         // Get single story
- clapStory(id)                        // Add clap
- getStoriesByTag(tag)                 // Filter by tag
```

### Permissions Model
- **Anonymous**: Read all stories
- **Authenticated User**: Create stories, edit own stories, clap stories
- **Admin**: All user capabilities + edit/delete any story

## 📖 Story Model

```typescript
interface Story {
  id: string
  title: string
  subtitle: string
  content: string
  author: string
  authorId: string
  authorAvatar: string
  readTime: number              // Auto-calculated
  tags: string[]
  claps: number
  publishedAt: string
  updatedAt: string
}
```

## 🛣️ Routes

```
/                  → Home page with story feed
/login             → Authentication page
/write             → Create new story (auth required)
/story/:id         → Read story
/edit/:id          → Edit story (auth + permissions required)
```

## 🎯 Key Features

### Clapping System
- Users can clap once per story
- Visual feedback with animation
- Clap count displayed on cards and story pages

### Read Time Calculation
```javascript
// Automatic calculation: ~200 words per minute
const wordCount = content.trim().split(/\s+/).length
const readTime = Math.max(1, Math.ceil(wordCount / 200))
```

### Tag System
- Comma-separated input during story creation
- Displayed on story cards and detail pages
- Filterable (future enhancement)

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (mobile), 1024px (tablet)
- Collapsible sidebar on smaller screens

## 🚀 Deployment

### Docker (Recommended)

```bash
# Build image
docker build -t medium-blog .

# Run container
docker run -p 3000:3000 medium-blog
```

### Traditional Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

### Platform-Specific

**Vercel**
```bash
vercel deploy
```

**Netlify**
```bash
netlify deploy --prod
```

**Railway/Render**
- Connect repository
- Set build command: `npm run build`
- Set start command: `npm start`

## 🔧 Configuration

### Environment Variables

```bash
# .env
NODE_ENV=production
PORT=3000
```

### Customization

**Colors** - Edit CSS variables in `app/styles.css`:
```css
:root {
  --color-bg: #ffffff;
  --color-text: #242424;
  --color-accent: #1A8917;
}
```

**Typography** - Update font imports:
```css
@import url('https://fonts.googleapis.com/...');
```

## 🎓 Learning Resources

### TanStack Start
- [Official Documentation](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [GitHub Repository](https://github.com/TanStack/router)

### React 19
- [React Documentation](https://react.dev)
- [What's New in React 19](https://react.dev/blog)

## 🤝 Contributing

This is a demo project, but you're welcome to:
1. Fork the repository
2. Create your feature branch
3. Make improvements
4. Submit a pull request

## 📝 Future Enhancements

- [ ] Rich text editor (Tiptap, Draft.js)
- [ ] Image upload and management
- [ ] Comments system
- [ ] Following/followers
- [ ] Reading lists
- [ ] Story bookmarking
- [ ] Email notifications
- [ ] Search functionality
- [ ] Draft stories
- [ ] Story statistics (views, reads)
- [ ] Related stories
- [ ] Author profiles
- [ ] Social sharing
- [ ] RSS feeds
- [ ] Dark mode

## 🐛 Known Issues

- LocalStorage limitation: Data is browser-specific
- No real-time updates (would need WebSockets)
- Limited to text content (no images in stories)

## 📄 License

MIT License - Free to use and modify

## 🙏 Acknowledgments

- Design inspired by [Medium](https://medium.com)
- Built with [TanStack Start](https://tanstack.com/start)
- Fonts from [Google Fonts](https://fonts.google.com)

## 💬 Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

---

**Built with ❤️ using React 19 and TanStack Start**
