import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TikTokCallback() {
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate hook to handle redirection

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
          client_key: 'sbawbhgbkawdim7q5i', // Replace with your TikTok Client Key
          client_secret: 'fjLvgSHVvrH1ZxLVuwBlpyN9Aqlsxsg4', // Replace with your TikTok Client Secret
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000/auth/tiktok/callback',
        });

        const { access_token } = response.data.data;

        // Save the access token to local storage or your state
        localStorage.setItem('tiktok_access_token', access_token);

        alert('TikTok login successful!');
        
        // Redirect the user to the home page after successful login
        navigate('/'); // Redirects to the home route ("/")
      } catch (error) {
        console.error('Error getting TikTok access token:', error);
        alert('Failed to log in with TikTok.');
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      fetchAccessToken(code);
    }
  }, [location, navigate]);  // Add navigate as a dependency

  return <div>Loading...</div>;
}
