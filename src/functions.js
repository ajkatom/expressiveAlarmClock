import axios from 'axios';
export default function getAllAlarms() {
  axios
    .get('/api/allAlarms')
    .then(res => res.data)
    .then(alarms => {
      return alarms;
    });
}
