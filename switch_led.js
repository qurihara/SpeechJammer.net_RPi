// Asumes #23 pin to a switch, and #18 pin to a LED. 

var settings = require('./settings');

var wpi = require('wiring-pi');

wpi.setup('gpio');
wpi.pinMode(23,wpi.modes.INPUT);
wpi.pullUpDnControl(23,wpi.PUD_UP);
wpi.pinMode(18, wpi.OUTPUT);
var prev_inp = wpi.digitalRead(23);
setTimeout(read(), 100);

function read(){
  var inp = wpi.digitalRead(23);
#  console.log(inp);
  if (inp != prev_inp){    
    setTimeout(emit_off(), 200);  
    prev_inp = inp;
  }
  setTimeout(read(), 100);  
}

var path = require('path');
function emit_off () {
  var targetUrl = path.join(settings.server_path,'delay_off');
  var req = http.get(targetUrl, function(res) {
    console.log('get response');
    res.setEncoding('utf8');
    res.on('data', function(str) {
          });
    res.on('end', function(){
    });
  });
  req.setTimeout(1000);

  req.on('timeout', function() {
    console.log('request timed out');
    req.abort()
  });

  req.on('error', function(err) {
    console.log("Error: " + err.code + ", " + err.message);
  });

}


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

socc.on('delay_duration', function (millisec) {
  debug_log("recieved delay_duration : " + millisec);
  delay = true;
  update();
  setTimeout(function(){
    delay = false;
    update();
  },millisec);
});

function update(){
        wpi.digitalWrite(18,delay);
        if(!delay) {
          debug_log("delay off");
        } else{
          debug_log("delay on");
        }
    });
}

function debug_log(msg){
  if (settings.debug){
    console.log(msg);
  }
}

update();
