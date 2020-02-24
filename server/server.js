const http = require('http');
const io = require('socket.io');

let server = http.createServer((req, res) => {});
server.listen(3000);

let wsServer = io.listen(server);
wsServer.on('connection', sock => {
  
});