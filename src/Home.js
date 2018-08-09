import React, { Component } from 'react';
import axios from 'axios';
import Alarm from './Awake';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: ''
    };
    this.setTime = this.setTime.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }
  setTime() {
    let date = new Date();
    let hr = date.getHours().toString();
    let min = date.getMinutes().toString();
    min < 10 ? (min = '0' + min) : null;
    this.setState({ time: `${hr}:${min}` });
  }
  getWeather(lat, long) {
    axios
      .get('/api/weather', {
        params: {
          lat: lat,
          long: long
        }
      })
      .then(res => console.log(res.data.daily));
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        let x = location.coords.latitude;
        let y = location.coords.longitude;
        this.getWeather(x, y);
      });
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    setInterval(() => this.setTime(), 100);
    return (
      <div>
        <h1>{this.state.time}</h1>
        <Alarm />
      </div>
    );
  }
}
