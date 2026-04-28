import { useState, useEffect, useCallback, useRef } from 'react';

const WORK_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_DURATION = 5 * 60;  // 5 minutes in seconds

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const sendNotification = useCallback((title, body) => {
    if (notificationsEnabled && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '🍅',
        silent: false
      });
    }
  }, [notificationsEnabled]);

  const toggleNotifications = async (event) => {
    const checked = event.target.checked;
    if (checked && 'Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        setNotificationsEnabled(permission === 'granted');
      } else {
        setNotificationsEnabled(Notification.permission === 'granted');
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const handleTimerComplete = useCallback(() => {
    if (isWorkMode) {
      sendNotification('☕ Break Time!', 'Good job! Time for a 5 minute break.');
      setIsWorkMode(false);
      setTimeLeft(BREAK_DURATION);
    } else {
      sendNotification('⏰ Work Time!', 'Break is over. Time to get back to work!');
      setIsWorkMode(true);
      setTimeLeft(WORK_DURATION);
    }
  }, [isWorkMode, sendNotification]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkMode(true);
    setTimeLeft(WORK_DURATION);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleTimerComplete]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  return (
    <div className="pomodoro-container">
      <h1>🍅 Pomodoro Timer</h1>

      <div className="timer-label">
        <span className={`status-indicator ${isWorkMode ? 'work' : 'break'}`}></span>
        {isWorkMode ? 'Work Session' : 'Break Time'}
      </div>

      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      <div className="controls">
        <button onClick={toggleTimer} className={isRunning ? 'active' : ''}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>
          Reset
        </button>
      </div>

      <div className="notification-toggle">
        <input
          type="checkbox"
          id="notifications"
          checked={notificationsEnabled}
          onChange={toggleNotifications}
        />
        <label htmlFor="notifications">Enable browser notifications</label>
      </div>
    </div>
  );
};

export default PomodoroTimer;
