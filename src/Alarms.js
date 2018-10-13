import React, { Component } from 'react';
import Awake from './Awake';
import axios from 'axios';

export default class Alarms extends Component {
  constructor(props) {
    super();
    this.state = {
      allAlrams: props || []
    };
    this.getAllAlarms = this.getAllAlarms.bind(this);
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
    const { allAlarms } = this.state;
    return (
      <div>
        <h1>Alarms</h1>

        {allAlarms &&
          allAlarms.map(alarm => {
            return (
              <div key={alarm.id}>
                <strong>{alarm.time}</strong>
                <div>
                  <label className="switch">
                    <input
                      checked={alarm.on}
                      type="checkbox"
                      datatype="toggle"
                      onChange={() => onChange()}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
