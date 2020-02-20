const io = require('socket.io');
module.exports = function (server) {

  let sockets = io.listen(server);
  let usuario_list = [];
  let fecha = new Date();
  let hora = fecha.getHours();
  let minuto = fecha.getMinutes();
  let segundo = fecha.getSeconds();
  let hora_mensaje = hora +':'+minuto+':'+segundo;

  sockets.on('connection',function(socket) {
    console.log('nuevo cliente conectado');

    socket.on('nuevo-usuario', function(data, respuesta){
      console.log(data);
      if (usuario_list.indexOf(data) != -1) {
        respuesta(false);
      }else {

        respuesta(true);
        socket.usuario = data;
        usuario_list.push(socket.usuario);
        sockets.emit('usuarios-conectados', usuario_list)

      }
    });

    socket.on('mensaje-del-cliente', function (data) {
        sockets.emit('mensaje-del-servidor',{
          hora:hora_mensaje,
          mensaje:data,
          usuario: socket.usuario
        })

    });

    socket.on('disconnect', function(data)  {

      if (!socket.usuario) return;

      usuario_list.splice(usuario_list.indexOf(socket.usuario),1)
      sockets.emit('usuarios-conectados', usuario_list)

    });

  });
}
