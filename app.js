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

var spawn = require('child_process').spawn;
var exec = require ('child_process').exec;
var ps = null;
function update(){
    exec('pkill aplay', function(err,stdout, stderr){
	console.log('kill aplay ' + err+stdout+stderr);
//      exec('pkill arecord', function(err,stdout, stderr){
//	console.log('kill arecord ' + err+stdout+stderr);
        var cmd;
        if(!delay) {
          cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 | aplay -R 1";
          debug_log("delay off");
        } else{
          cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 | aplay";
          debug_log("delay on");
        }
        exec(cmd,function(err,stdout, stderr){
    	  console.log('command exec ' + err+stdout+stderr);
        });
        //ps = shspawn(cmd);
//      });
    });
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
