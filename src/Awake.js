import React, { Component } from 'react';
import axios from 'axios';
//import Alarms from './Alarms';

export default class Alarm extends Component {
  constructor() {
    super();
    this.state = {
      hr: '',
      min: '',
      allAlrams: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.editAlarm = this.editAlarm.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onChange(ev) {
    let key = ev.target.name;
    let value = ev.target.value;
    this.setState({ [key]: value });
  }
  onSubmit() {
    let time = `${this.state.hr}:${this.state.min}`;
    let { editAlarm } = this;
    axios
      .get('/api/setAlarm', {
        params: {
          time: time,
          on: true
        }
      })
      .then(res => res.data)
      .then(result => {
        const { alarm } = result;
        !alarm.on && !result.isNew
          ? (Object.assign(alarm, { on: true }), editAlarm(alarm))
          : this.getAllAlarms();
      });
  }
  onDelete(alarm) {
    axios
      .delete('/api/deleteAlarm', {
        params: {
          id: alarm.id
        }
      })
      .then(() => this.getAllAlarms());
  }
  editAlarm(alarm) {
    axios.put('/api/editAlarm/', { alarm }).then(() => {
      return this.getAllAlarms();
    });
  }
  toggle(alarm) {
    let onOff = alarm.on;
    Object.assign(alarm, { on: !onOff });
    this.editAlarm(alarm);
  }

  getAllAlarms() {
    axios
      .get('/api/allAlarms')
      .then(res => res.data)
      .then(alarms => this.setState({ allAlarms: alarms }));
  }
  componentDidMount() {
    this.getAllAlarms();
  }
  render() {
    const { allAlarms, hr, min } = this.state;
    return (
      <div>
        <input
          name="hr"
          placeholder="HR"
          defaultValue={hr}
          onChange={this.onChange}
        />
        <span>:</span>
        <input
          name="min"
          placeholder="MIN"
          defaultValue={min}
          onChange={this.onChange}
        />
        <button type="submit" onClick={this.onSubmit}>
          Set
        </button>
        <div>
          <h1>Alarms</h1>

          {allAlarms &&
            allAlarms.map(alarm => {
              return (
                <div className="alarm-row" key={alarm.id}>
                  <strong>{alarm.time}</strong>
                  <label className="switch">
                    <input
                      checked={alarm.on}
                      type="checkbox"
                      datatype="toggle"
                      onChange={() => this.toggle(alarm)}
                    />
                    <span className="slider" />
                  </label>
                  <button
                    className="btn btn-link"
                    type="submit"
                    onClick={() => this.onDelete(alarm)}
                  >
                    &#10060;
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
