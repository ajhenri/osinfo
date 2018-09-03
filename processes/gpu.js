const os = require('os');
const platform = os.platform();

var exec = require('child_process').exec;
if(platform == 'win32'){
  exec('wmic path win32_VideoController get name', function(err, stdout, stderr) {
    console.log(stdout);
  });
} else {
  exec('system_profiler | grep GeForce', function(err, stdout, stderr) {
    console.log(stdout);
  });
}

module.exports = platform;