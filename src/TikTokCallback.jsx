import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TikTokCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
          client_key: 'sbawbhgbkawdim7q5i',  // Replace with your TikTok Client Key
          client_secret: 'fjLvgSHVvrH1ZxLVuwBlpyN9Aqlsxsg4',  // Replace with your TikTok Client Secret
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:5173/auth/tiktok/callback',
        });

        const { access_token } = response.data.data;
        
        // Fetch TikTok User Info
        const userInfoResponse = await axios.get('https://open-api.tiktok.com/user/info/', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const user = userInfoResponse.data.data;

        // Save user data (access_token, user info, etc.) to local storage or state
        localStorage.setItem('tiktok_access_token', access_token);
        localStorage.setItem('tiktok_user', JSON.stringify(user));

        alert('TikTok sign up successful!');

        // Redirect to login page after successful sign-up
        navigate('/login');
      } catch (error) {
        console.error('Error during TikTok OAuth:', error);
        alert('Failed to sign up with TikTok.');
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      fetchAccessToken(code);
    }
  }, [location, navigate]);

  return <div>Signing you up...</div>;
}
