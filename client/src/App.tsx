import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = () => {
  const [user, setUser] = useState({id: '', userName: '', imageUrl: '', intraUrl: '', internshipValidated: false})

  return (
    <Router>
      <LandingPage />
    </Router>
  );
};

export default App;