// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // Check for a stored user ID in session storage on component mount
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (id) => {
    setUserId(id);

    // Store user ID in session storage
    sessionStorage.setItem('userId', id);
    // Perform other login-related actions if needed
  };

  const logout = () => {
    setUserId(null);

    // Remove user ID from session storage
    sessionStorage.removeItem('userId');
    // Perform other logout-related actions if needed
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
