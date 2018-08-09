import React, { Component } from 'react';
import axios from 'axios';

export default class Alarm extends Component {
  constructor() {
    super();
    this.state = {
      hr: '',
      min: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    let key = ev.target.name;
    let value = ev.target.value;
    this.setState({ [key]: value });
  }
  onSubmit() {
    let time = `${this.state.hr}:${this.state.min}`;
    axios
      .get('/api/setAlarm', {
        params: {
          time: time,
          on: true
        }
      })
      .then(res => res.data)
      .then(data => console.log(data));
  }
  render() {
    return (
      <div>
        <input
          name="hr"
          placeholder="HR"
          defaultValue={this.state.hr}
          onChange={this.onChange}
        />
        <span>:</span>
        <input
          name="min"
          //placeholder="MIN"
          defaultValue={this.state.min}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
