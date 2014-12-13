var settings = require('./settings');

var delay = settings.initial_state;

var ioc = require('socket.io-client');
var socc;
debug_log("connecting to server...");
socc = ioc.connect(settings.server_path);
socc.on('connect', function (data) {
  debug_log("connected to server.");
});
socc.on('delay_status', function (msg) {
  debug_log("recieved delay_status : " + msg);
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

function debug_log(msg){
  if (settings.debug){
    console.log(msg);
  }
}

