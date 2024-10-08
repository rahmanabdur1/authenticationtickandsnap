import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SnapchatCallback() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook to handle redirection

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await axios.post('https://accounts.snapchat.com/accounts/oauth2/token', {
          client_id: 'd4da7e5c-5036-4112-9fad-3f7b6f324721',  // Replace with your Snapchat Client ID
          client_secret: 'wn4f1TVWdd88_Wxt51iNl6u5le5TCNkGoKObMcHgLKk',  // Replace with your Snapchat Client Secret
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:5173/auth/snapchat/callback',
        });

        const { access_token } = response.data;

        const userInfoResponse = await axios.get('https://kit.snapchat.com/v1/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const user = userInfoResponse.data;

        // Save user data (access_token, user info, etc.) to local storage or state
        localStorage.setItem('snapchat_access_token', access_token);
        localStorage.setItem('snapchat_user', JSON.stringify(user));

        alert('Snapchat login successful!');

        // Redirect to home page after successful login
        navigate('/home');
      } catch (error) {
        console.error('Error during Snapchat OAuth:', error);
        alert('Failed to log in with Snapchat.');
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      fetchAccessToken(code);
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
}