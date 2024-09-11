import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TikTokLogin from './TikTokLogin';
import TikTokCallback from './TikTokCallback';
import SnapchatLogin from './SnapchatLogin';
import SnapchatCallback from './SnapchatCallback';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <h1>Welcome to TikTok & Snapchat Login</h1>
        <Routes>
          <Route path="/" element={<div>
              <TikTokLogin />
              <SnapchatLogin />
            </div>} 
          />
          <Route path="/auth/tiktok/callback" element={<TikTokCallback />} />
          <Route path="/auth/snapchat/callback" element={<SnapchatCallback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
