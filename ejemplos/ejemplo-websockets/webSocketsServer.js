const socketio = require('socket.io');

// exportar una función que configura un servidor HTTP
module.exports = (server) => {
  const io = socketio(server);

  // ante cada conexión de un cliente (socket)
  io.on('connection', socket => {
    console.log('Nueva conexión de un cliente, con el id', socket.id);

    socket.on('nuevo-mensaje', texto => {
      console.log('mensaje recibido de un cliente', texto);
      // reenviar el mensaje a todos los sockets conectados
      io.emit('mensaje-desde-el-servidor', texto);
    });

    setInterval(() => {
      socket.emit('noticia', 'noticia numero' + Date.now())
    }, 2000);

  });
}