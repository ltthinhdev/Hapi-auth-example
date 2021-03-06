import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './scenes/login/Login';
import Home from './scenes/home/Home';
import Register from './scenes/register/Register';
import AnimationHome from './scenes/home/AnimationHome';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={AnimationHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
