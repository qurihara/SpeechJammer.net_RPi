var settings = require('./settings');

var delay = settings.initial_state;

//var spawn = require('child_process').spawn;
var exec = require ('child_process').exec;
var ps = null;
function update(){
    exec('pkill aplay', function(err,stdout, stderr){
	console.log('kill aplay ' + err+stdout+stderr);
//      exec('pkill arecord', function(err,stdout, stderr){
//	console.log('kill arecord ' + err+stdout+stderr);
        var cmd;
        if(!delay) {
//          cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 -B 20000| aplay -B 20000"; // for built-in headphone
          cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 -B 20000| aplay -B 20000 -D plughw:1,0"; // for usb headphone
          debug_log("delay off");
        } else{
//          cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 -B 200000| aplay -B 200000"; // for built-in headphone
          cmd = "arecord -D hw:1,0 -f S16_LE -r 16000 -B 200000| aplay -D plughw:1,0 -B 200000"; // for usb headphone
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


// Asumes #23 pin to a switch, and #18 pin to a LED. 
var wpi = require('wiring-pi');

wpi.setup('gpio');
wpi.pinMode(23,wpi.modes.INPUT);
wpi.pullUpDnControl(23,wpi.PUD_UP);
wpi.pinMode(18, wpi.OUTPUT);
var prev_inp = wpi.digitalRead(23);
read();

function read(){
  var inp = wpi.digitalRead(23);
//  console.log(inp);
  if (inp != prev_inp){    
    setTimeout(toggle(), 200);  
    prev_inp = inp;
  }
  setTimeout(function() {
    read();
  }, 100);  
}

function toggle() {
	delay = !delay;
	update();
}


