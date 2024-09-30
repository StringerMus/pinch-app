import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 7000);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && (
        <div style={{
            position: "fixed",
            bottom: 10, // Adjusts the distance from the top
            left: "50%", // Positions it at the horizontal center
            transform: "translateX(-50%)", // Centers it horizontally
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            zIndex: 1000
        }}>
          {notification}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
