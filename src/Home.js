import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: ''
    };
    this.setTime = this.setTime.bind(this);
  }
  setTime() {
    let date = new Date();
    let hr = date.getHours().toString();
    let min = date.getMinutes().toString();
    min < 10 ? (min = '0' + min) : null;
    this.setState({ time: `${hr}:${min}` });
  }
  render() {
    setInterval(() => this.setTime(), 100);
    return <h1>{this.state.time}</h1>;
  }
}
