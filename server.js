const app = require('./server/app');
const server = require('http').createServer(app);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`ready to go on port ${port}`));
