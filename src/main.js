import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Container } from 'reactstrap';
import Home from './Home';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Home />
        </Container>
      </Router>
    );
  }
}
