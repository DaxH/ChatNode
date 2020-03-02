$(function () {
  // chat
  let socket = io();
  let mensaje = $('#mensaje-chat');
  let chat = $('#chat');

  // usuario
  let $usuario_form = $('#usuario-form');
  let $usuario_nombre = $('#usuario-nombre');
  let $usuario_error = $('#usuario-error');
  let $usuarios_activos = $('#usuario-activo');
  let usuarios = [];

  $usuario_form.submit(function(evento) {
    evento.preventDefault();
    socket.emit('nuevo-usuario', $usuario_nombre.val(), function(data) {
      if (data) {
        $('#contenedor-usuario').hide();
        $('#contenedor-chat').show();
      }else {
        $usuario_error.html(`<div class="alert alert-danger">Ese Usuario ya Existe</div>`);
      }
      $usuario_nombre.val('');
    });
  });

  socket.on('usuarios-conectados', function(data){
    let html = '';
    for (var i = 0; i < data.length; i++) {

      html += `<p>${data[i]}</p>`;
    }
    $usuarios_activos.html(html);
  });

  mensaje.focus();

  $('#caja-mensaje').submit(function(evento) {
    evento.preventDefault();

    socket.emit('mensaje-del-cliente', mensaje.val());
    mensaje.val('');
  });

  socket.on('mensaje-del-servidor', function (data) {
    chat.append(data.hora+' '+'<b>'+ data.usuario + '</b>: ' + data.mensaje + '<br/>')

    switch (data.mensaje) {
      case 'hola' : chat.append(data.hora+' '+'<b>'+ 'Servidor'+ '</b>: ' + "hola"+'<br/>')
        break;
      case 'como estas': chat.append(data.hora+' '+'<b>'+ 'Servidor'+ '</b>: ' + ""+'ahi posi<br/>')
        break;
      case 'como estas': chat.append(data.hora+' '+'<b>'+ 'Servidor'+ '</b>: ' + "no lo se rick"+'<br/>')
        break;
      case '': chat.append(data.hora+' '+'<b>'+ 'Servidor'+ '</b>: ' + "en enviaste nada :v"+'<br/>')
        break;
      case '': chat.append(data.hora+' '+'<b>'+ 'Servidor'+ '</b>: ' + ""+'<br/>')
        break;
      default:
    }
  });
});
