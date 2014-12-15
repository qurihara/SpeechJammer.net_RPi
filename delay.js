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
  update();
});

var spawn = require('child_process').spawn
var ps = null;
function update(){
  stop();
  var cmd;
  if(!delay) {
    cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 | aplay -R 1";
  } else{
    cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 | aplay";
  }
  update(cmd);
}
function stop(){
  if(ps) {
    ps.kill();
    ps = null;
  }
}

function shspawn(command) {
  return spawn('sh', ['-c', command]);
}

function debug_log(msg){
  if (settings.debug){
    console.log(msg);
  }
}

update();
