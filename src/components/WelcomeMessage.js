import React, { useState } from "react";

const WelcomeMessage = () => {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     try {
//       // Retrieve the access token from session storage
//       const accessToken = sessionStorage.getItem('access_token');

//       if (!accessToken) {
//         // Token is not present, handle accordingly
//         console.log('No access token found');
//         return;
//       }

//       // Decode the token
//       const decodedToken = jwt.decode(accessToken);

//       if (!decodedToken) {
//         // Decoding failed, handle accordingly
//         console.log('Decoding failed');
//         return;
//       }

//       // Set the user state with the decoded information
//       setUser(decodedToken);
//     } catch (error) {
//       console.error('Error decoding token:', error);
//     }
//   }, []); // The empty dependency array ensures this effect runs once on component mount

  return (
    <>
      <div>
        {user ? (
          <h1 className="welcome">Welcome back, {user.username}!</h1>
        ) : (
          <p>Please login to see personalized content</p>
        )}
      </div>
    </>
  );
}

export default WelcomeMessage;
