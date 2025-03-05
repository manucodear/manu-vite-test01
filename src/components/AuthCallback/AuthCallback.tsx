import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const AuthCallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate  = useNavigate(); // Create a history object for navigation

  useEffect(() => {
    // Extract authorization code from the URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Send the authorization code and code_verifier to the backend to get the access token
      axios
        .post('http://localhost:4000/auth/callback', {
          code
        })
        .then((response) => {
          console.log('response.data', response.data);
          const access_token = response.data;
          if (access_token) {
            // Store the access token in localStorage (or sessionStorage)
            localStorage.setItem('access_token', access_token); // or sessionStorage.setItem('access_token', access_token);
            console.log('Access token stored:', access_token);

            // Redirect the user to another page (e.g., Dashboard, Home, etc.)
            navigate('/files/recent');  // Navigate to the dashboard or any other route
            // Alternatively, you can use window.location.replace('/dashboard') if you're not using React Router
          }
        })
        .catch((err) => {
          setError('Authentication failed');
          console.error(err);
        });
    } else {
      setError('Authorization code or code_verifier not found');
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>Please wait while we finish the authentication process.</p>
    </div>
  );
};

export default AuthCallback;
