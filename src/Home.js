import React, { Component } from 'react';
import axios from 'axios';
import Alarm from './Awake';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: '',
      allAlarms: []
    };
    this.setTime = this.setTime.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.getAllAlarms = this.getAllAlarms.bind(this);
  }
  setTime() {
    let date = new Date();
    let hr = date.getHours().toString();
    let min = date.getMinutes().toString();
    min < 10 ? (min = '0' + min) : null;
    hr < 10 ? (hr = '0' + hr) : null;
    this.setState({ time: `${hr}:${min}` });
  }
  getAllAlarms() {
    axios
      .get('/api/allAlarms')
      .then(res => res.data)
      .then(alarms => this.setState({ allAlarms: alarms }));
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
    this.getAllAlarms();
  }

  render() {
    const { allAlarms, time } = this.state;
    const { getLocation, getAllAlarms, setTime } = this;
    setInterval(() => {
      setTime();
      allAlarms.map(alarm => {
        if (this.state.time == alarm) return cosnole.log('ok');
      });
    }, 100);
    return (
      <div>
        <h1>{this.state.time}</h1>
        <Alarm />
      </div>
    );
  }
}
