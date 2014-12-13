var settings = require('./settings');

var app = require('http').createServer(handler),
	io = require('socket.io').listen(app,{'log level': 1});
app.listen(settings.port);

var http = require('http');

function handler(req,res){
	console.log(req.url);
	if (req.url.lastIndexOf('/delay_on', 0) === 0){
      io.sockets.emit('delay_status',true);
      console.log("delay_status true emitted.");
  }
  if (req.url.lastIndexOf('/delay_off', 0) === 0){
      io.sockets.emit('delay_status',false);
      console.log("delay_status false emitted.");
  }
  res.writeHead(200);
  res.write("ok");
  res.end();
  return;
}

io.sockets.on('connection', function (socket) {
    console.log('a client connected.');
});
