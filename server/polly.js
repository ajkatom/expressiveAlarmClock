const AWS = require('aws-sdk');
const fs = require('file-system');

AWS.config.setPromisesDependency(require('bluebird'));
// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
});

let params = {
  Text: 'Hi, my name is @anaptfox.',
  OutputFormat: 'mp3',
  VoiceId: 'Kimberly'
};

let synthesizeSpeechPromise = Polly.synthesizeSpeech(params).promise();

synthesizeSpeechPromise
  .then(data => {
    if (data.AudioStream instanceof Buffer) {
      fs.writeFile('./speech.mp3', data.AudioStream, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
