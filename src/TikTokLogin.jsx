// src/TikTokLogin.js
import React from 'react';

export default function TikTokLogin() {
  const handleLogin = () => {
    const clientKey = 'sbawbhgbkawdim7q5i'; // Replace with your TikTok Client Key
    const redirectUri = 'http://localhost:3000/auth/tiktok/callback'; // Replace with the URI you set in the TikTok Developer Portal
    const tiktokOAuthUrl = `https://open-api.tiktok.com/platform/oauth/connect/?client_key=${clientKey}&redirect_uri=${redirectUri}&response_type=code&scope=user.info.basic`;

    // Redirect to TikTok OAuth page
    window.location.href = tiktokOAuthUrl;
  };

  return (
    <button onClick={handleLogin}>
      Login with TikTok
    </button>
  );
}
