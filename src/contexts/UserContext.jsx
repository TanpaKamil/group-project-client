import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [visitorName, setVisitorName] = useState(() => {
    // Try to get visitor name from localStorage
    return localStorage.getItem('visitorName') || '';
  });
  
  const [sessionId, setSessionId] = useState(() => {
    // Try to get session ID from localStorage
    return localStorage.getItem('sessionId') || '';
  });

  // Persist visitor name to localStorage whenever it changes
  useEffect(() => {
    if (visitorName) {
      localStorage.setItem('visitorName', visitorName);
    }
  }, [visitorName]);

  // Persist session ID to localStorage whenever it changes
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    }
  }, [sessionId]);

  // Clear session data
  const clearSession = () => {
    setVisitorName('');
    setSessionId('');
    localStorage.removeItem('visitorName');
    localStorage.removeItem('sessionId');
  };

  return (
    <UserContext.Provider 
      value={{
        visitorName,
        setVisitorName,
        sessionId,
        setSessionId,
        clearSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};