import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Awake from './Awake';
import Home from './Home';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Home />
      </Router>
    );
  }
}
