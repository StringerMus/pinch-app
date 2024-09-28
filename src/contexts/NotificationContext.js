import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Auto-hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && (
        <div style={{ position: "fixed", bottom: 10, right: 10, backgroundColor: "green", color: "white", padding: "10px", zIndex: 1000 }}>
          {notification}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
