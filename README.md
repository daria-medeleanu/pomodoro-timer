# 🍅 Pomodoro Timer

React Pomodoro timer with 25 minute work sessions, 5 minute breaks, and browser notifications.

## ✨ Features
- **Classic Pomodoro intervals**: 25 min work / 5 min break automatic cycles
- Start, Pause and Reset controls
- Desktop browser notifications when switching modes
- Visual status indicator for active session type
- Clean minimal interface
- Proper React component structure

## 🚀 Usage

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔔 Notifications
Enable browser notifications to get alerts when your work session ends and when break time is over. Notifications will work even when the browser tab is in background.

## 📦 Project Structure
```
src/
├── components/
│   └── PomodoroTimer.jsx      # Main timer component
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## 🎯 Controls
| Button | Action |
|--------|--------|
| Start | Begin timer countdown |
| Pause | Pause active timer |
| Reset | Reset back to 25:00 work session |

Made with React + Vite
