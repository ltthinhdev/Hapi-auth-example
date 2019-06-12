import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './scenes/login/Login';
import Home from './scenes/home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
