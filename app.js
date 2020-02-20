const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const server = http.createServer(app);


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000
server.listen(port,function(){
  console.log('Sevidor Chat Iniciado' ,port);
});

require('./sockets')(server);
