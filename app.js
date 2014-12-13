var settings = require('./settings');

var delay = false;

var ioc = require('socket.io-client');
var socc;
console.log("connecting to server...");
socc = ioc.connect(settings.server_path);
socc.on('connect', function (data) {
  console.log("connected to server.");
});
socc.on('delay_status', function (msg) {
  console.log("recieved delay_status : " + msg);
  delay = msg;
});

process.stdin.on('data',function(chunk){
        if (!delay){
                process.stdout.write(chunk);
        }
        else
        {
                setTimeout(function(){
                        process.stdout.write(chunk);
                }, settings.delay);
        }
});

