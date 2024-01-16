import React, { useState, useEffect } from 'react';

const WelcomeMessage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the JWT from sessionStorage
    const jwtToken = sessionStorage.getItem(`accessToken`);

    console.log('Token from sessionStorage:', jwtToken);

    // Decode the JWT to get user information
    if (jwtToken) {
      const decodedToken = parseJwt(jwtToken);
      console.log('Decoded Token:', decodedToken);

      setUser(decodedToken.user);
    }
  }, []);

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  console.log('User State:', user);

  return (
    <div>
      {user ? (
        <p>Welcome back, {user.username}!</p>
      ) : (
        <p>Please log in to see the welcome message.</p>
      )}
    </div>
  );
};

export default WelcomeMessage;
