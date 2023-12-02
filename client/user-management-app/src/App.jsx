// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './PageLayout';
import TeamDetails from './components/TeamDetails';
import TeamListIndex from './components/TeamListIndex';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />} />
        <Route path="/team-details" element={<TeamListIndex />} />
        <Route path="/team-details/:name" element={<TeamDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
