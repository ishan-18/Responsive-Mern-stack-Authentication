import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Pages from './components/Auth/Pages';
import Header from './components/Headers/Header';


function App() {
  return (
    <Router>
      <Header />
      <Pages />
    </Router>
  );
}

export default App;
