const http = require('http');
const io = require('socket.io');

const tasks = [];

let server = http.createServer((req, res) => {});
server.listen(3000, () => console.log('Server is listening at port 3000...'));

let wsServer = io.listen(server);
wsServer.on('connection', sock => {
  sock.emit('data', tasks);

  sock.on('add', data => {
    tasks.push(data);
  });
  sock.on('update', data => {
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i] === data.task) {
        for(const key in data.update) {
          tasks[i][key] = update[key];
        }       
        break;
      }
    } 
  });
  sock.on('remove', data => {
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].id == data) {
        tasks.splice(i, 1);
        break;
      }
    }
  });
});