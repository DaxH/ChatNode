const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const server = http.createServer(app);

app.set('port', 1111);
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

server.listen(app.get('port'),function(){
  console.log('Sevidor Chat Iniciado');
});

require('./sockets')(server);
