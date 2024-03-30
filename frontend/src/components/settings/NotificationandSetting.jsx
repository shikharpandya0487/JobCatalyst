import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext'; // Import useTheme hook

const NotificationAndSetting = () => {
  const { theme, toggleTheme } = useTheme(); // Use the useTheme hook to access theme state and toggle function

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    pushNotifications: false,
    eventUpdates: false,
  });

  const [language, setLanguage] = useState('english');

  useEffect(() => {
    // fetch preferences from local storage
    const fetchNotificationPreferences = () => {
      // Replace with your actual fetch logic
      const savedPreferences = localStorage.getItem('notificationPreferences');
      if (savedPreferences) {
        setNotificationPreferences(JSON.parse(savedPreferences));
      }
    };

    fetchNotificationPreferences();
  }, []);

  useEffect(() => {
    // Save the Changes
    localStorage.setItem('notificationPreferences', JSON.stringify(notificationPreferences));
  }, [notificationPreferences]);

  const handleToggleNotification = (notificationType) => {
    setNotificationPreferences((prevPreferences) => ({
      ...prevPreferences,
      [notificationType]: !prevPreferences[notificationType],
    }));
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div style={{ width: "900px", maxWidth: "1000px", margin: "auto", padding: "20px", backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <div style={{ marginBottom: "20px" }}>
        <h4>Notification Preferences</h4>
        <div style={{ marginBottom: "15px" }}>
          {/* Notification Preferences section */}
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email Notifications:
          </label>
          <input
            type="checkbox"
            id="email"
            checked={notificationPreferences.email}
            onChange={() => handleToggleNotification('email')}
            style={{ width: "auto" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="pushNotifications" style={{ display: "block", marginBottom: "5px" }}>
            Push Notifications:
          </label>
          <input
            type="checkbox"
            id="pushNotifications"
            checked={notificationPreferences.pushNotifications}
            onChange={() => handleToggleNotification('pushNotifications')}
            style={{ width: "auto" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="eventUpdates" style={{ display: "block", marginBottom: "5px" }}>
            Event Updates:
          </label>
          <input
            type="checkbox"
            id="eventUpdates"
            checked={notificationPreferences.eventUpdates}
            onChange={() => handleToggleNotification('eventUpdates')}
            style={{ width: "auto" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>General Settings</h4>
        <div style={{ marginBottom: "15px" }}>
          {/* Theme section */}
          <label htmlFor="theme" style={{ display: "block", marginBottom: "5px" }}>
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => toggleTheme(e.target.value)} // Use toggleTheme to change the theme
            style={{ width: "100%", padding: "8px", borderRadius: "13px" }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          {/* Language section */}
          <label htmlFor="language" style={{ display: "block", marginBottom: "5px" }}>
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "13px" }}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotificationAndSetting