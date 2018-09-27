import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import './App.scss';

import Login from '../login';
import Home from '../home';
import Register from '../register';

class App extends Component {
  render() {
    return (
      <Router history= { browserHistory }>
        <Route path="/" component={ Home }/>
        <Route path="/login" component={ Login }/>
        <Route path="/register" component={ Register }/>
      </Router>
    );
  }
}

export default App;