# ZenFocus - Pomodoro Timer with AI Backgrounds

## Overview

ZenFocus is a productivity-focused Pomodoro timer application that combines time management techniques with AI-generated calming background imagery. The application provides a distraction-free environment for focused work sessions by featuring dynamically changing, eye-soothing backgrounds while maintaining a clean, functional timer interface. Built with a focus on simplicity and zen aesthetics, it helps users maintain productivity through structured focus and break periods.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot-module replacement
- Wouter for lightweight client-side routing (currently single-page application)

**UI Component Strategy:**
- Shadcn/ui component library (New York style variant) providing a comprehensive set of Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Glassmorphism design pattern for timer display cards (transparent backgrounds with backdrop blur)
- Material Design-inspired approach balanced with zen aesthetics for minimal distraction

**State Management:**
- TanStack Query (React Query) for server state management and background image fetching
- Local React hooks for timer state, settings persistence via localStorage
- Custom `useTimer` hook encapsulating all Pomodoro timer logic including mode transitions and session counting

**Design System:**
- CSS custom properties for theme colors supporting light/dark modes
- Typography: Inter/Nunito for UI, extremely large timer display (7xl-9xl) with light font weight
- Spacing system based on Tailwind's 4px unit scale
- Single-column, centered layout (max-w-2xl) with full-viewport backgrounds

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- HTTP server created via Node's built-in `http` module for potential WebSocket upgrades
- Middleware: JSON body parsing, URL-encoded form data support, CORS handling

**API Design:**
- RESTful endpoint: `GET /api/background` returns random calming background images
- Background images sourced from Unsplash with predefined calming themes (nature, mountains, ocean, zen gardens, etc.)
- Timestamp-based cache busting for fresh image delivery
- Static file serving for built client assets

**Build Process:**
- esbuild for server-side bundling with selective dependency bundling (allowlist approach reduces cold start times)
- Separate client and server build outputs (client to `dist/public`, server to `dist/index.cjs`)
- Development mode uses Vite middleware integrated into Express for HMR

### Data Storage Solutions

**Database Setup:**
- Drizzle ORM configured for PostgreSQL (via `@neondatabase/serverless`)
- Schema defines basic user authentication structure (users table with username/password)
- Currently using in-memory storage (`MemStorage` class) for development/demo purposes
- Database migrations configured to `./migrations` directory

**Client-Side Persistence:**
- LocalStorage for Pomodoro settings (focus duration, break duration, long break duration)
- Settings persisted under `STORAGE_KEY = "pomodoro-settings"`
- Default values: 25min focus, 5min break, 15min long break

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components (dialogs, sliders, switches, tooltips, etc.)
- Lucide React for icon system
- class-variance-authority and clsx for conditional styling utilities

**API & External Services:**
- Unsplash Source API for calming background imagery (no API key required)
- 15 predefined calming theme categories rotated randomly:
  - peaceful nature landscape, serene mountain scenery, calm ocean waves
  - misty forest morning, gentle sunset sky, tranquil lake reflection
  - soft clouds sky, zen garden peaceful, aurora borealis night
  - lavender field purple, cherry blossom spring, peaceful meadow flowers
  - foggy valley mountains, calm beach tropical, starry night sky

**Development Tools:**
- Replit-specific plugins for development experience (runtime error modal, cartographer, dev banner)
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation utilities

### Timer Logic & User Experience

**Pomodoro Flow:**
- Three modes: focus (default 25min), short break (5min), long break (15min after 4 sessions)
- Session counter tracks completed Pomodoros
- Auto-progression between modes with visual/audio notifications
- Persistent settings survive page refreshes

**Control Mechanisms:**
- Play/Pause toggle for timer control
- Reset button returns to start of current mode
- Skip button advances to next mode immediately
- Settings dialog with sliders for duration customization and sound toggle

**Visual Feedback:**
- Large centered timer display with tabular numbers for consistent width
- Mode indicator badge above timer (animated pulse when running)
- Glassmorphism cards with white/transparency overlays on background images
- Smooth background transitions (2-second crossfade) when refreshing imagery
- Manual background refresh button with loading states