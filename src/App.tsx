// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';

import EasyMode from './components/EasyMode';
import NormalMode from './components/NormalMode';
// import EasyModeRankingBoard from './components/EasyModeRankingBoard';
// import NormalModeRankingBoard from './components/NormalModeRankingBoard';
import { RankingProvider } from './contexts/RankingContext';

const App: React.FC = () => (
  <RankingProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/easy" element={<EasyMode />} />
        <Route path="/normal" element={<NormalMode />} />
        {/* <Route path="/easyranking" element={<EasyModeRankingBoard />} /> */}
        {/* <Route path="/normalranking" element={<NormalModeRankingBoard />} /> */}
      </Routes>
    </Router>
  </RankingProvider>
);

export default App;
