# ZenFocus - Pomodoro Timer

A calming Pomodoro timer with AI-generated eye-soothing background wallpapers. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Focus Timer**: 25-minute focus sessions (customizable)
- **Break Timer**: 5-minute short breaks (customizable)
- **Long Break**: 15-minute long breaks after 4 focus sessions (customizable)
- **Session Tracking**: Visual indicator of completed Pomodoro sessions
- **AI-Generated Backgrounds**: Beautiful gradient backgrounds that change with each session
- **Glassmorphism UI**: Modern, frosted glass aesthetic
- **Audio Feedback**: Gentle notification sound when timer completes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: WCAG AAA compliant with keyboard navigation support

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Inline SVG icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

1. **Start/Pause**: Click the Start button to begin a focus session
2. **Reset**: Click Reset to return the timer to its initial state
3. **Skip**: Click Skip to move to the next session type
4. **Settings**: Click the gear icon to customize timer durations
5. **Background**: Backgrounds automatically change when sessions complete

## Customization

You can customize the following settings:

- **Focus Duration**: 1-60 minutes (default: 25)
- **Break Duration**: 1-30 minutes (default: 5)
- **Long Break Duration**: 1-30 minutes (default: 15)

## Design Philosophy

ZenFocus follows a minimalist design approach with:

- **Clarity Over Decoration**: UI elements remain highly readable against any background
- **Calm Focus**: Minimal distractions, smooth transitions
- **Effortless Customization**: Settings accessible but not intrusive
- **Breathing Room**: Generous spacing to reduce visual stress

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT