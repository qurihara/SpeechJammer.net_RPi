var settings = require('./settings');

var app = require('http').createServer(handler),
	io = require('socket.io').listen(app,{'log level': 1}),
  fs = require('fs');
app.listen(settings.port);

var http = require('http');

function handler(req,res){
	console.log(req.url);
	if (req.url.lastIndexOf('/delay_on', 0) === 0){
      io.sockets.emit('delay_status',true);
      console.log("delay_status true emitted.");
      res.writeHead(200);
      res.write("ok");
      res.end();
      return;
  }
  if (req.url.lastIndexOf('/delay_off', 0) === 0){
      io.sockets.emit('delay_status',false);
      console.log("delay_status false emitted.");
      res.writeHead(200);
      res.write("ok");
      res.end();
      return;
  }

  fs.readFile(__dirname + req.url,function(err,data){
    if(err){
     res.writeHead(500);
     return res.end('Error: ' + err);
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  });
}

io.sockets.on('connection', function (socket) {
    console.log('a client connected.');
});
