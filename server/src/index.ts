const app = require('express')();
const http = require('http').Server(app);
const Server = require('socket.io');

const io = new Server(http, {
  path: '/data',
});

const users = [];

io.on('connection', (socket) => {
  socket.emit({ test: 'something', });
  console.log(`[${Date.now()}] New connection`);

  socket.on('disconnect', () => {
    console.log('Disconnection');
  });
});

http.listen(3000, () => {
  console.log('Listening to :3000');
});
