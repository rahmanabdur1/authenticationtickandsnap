import React from 'react';

export default function SnapchatLogin() {
  const handleLogin = () => {
    const clientId = 'd4da7e5c-5036-4112-9fad-3f7b6f324721';  // Replace with your Snapchat Client ID
    const redirectUri = 'http://localhost:3000/auth/snapchat/callback'; // Replace with your redirect URI
    const snapchatOAuthUrl = `https://accounts.snapchat.com/accounts/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=snapchat.marketing`;

    // Redirect to Snapchat OAuth page
    window.location.href = snapchatOAuthUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Snapchat</button>
    </div>
  );
}
