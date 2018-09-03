const os = require('os');
const platform = os.platform();

var spawn = require('child_process').spawn;

const tasksModule = {
  getTasks: function(){
    var process = null;
    if(platform == 'win32'){
      getTop10 = 'Get-Process | Sort CPU -descending | Select -first 30 -Property ID,ProcessName,CPU | format-table -autosize';
    } else {
      process = spawn('ps', ['-Ao', 
        'pid,ppid,user,name,uid,comm,cmd,pcpu,pmem,tty',
        '-r']);
    }

    var lines = [];
    exec(getTop10, function(err, stdout, stderr) {
      console.log('DONE');
      console.log(stdout);
      lines = stdout;
    });

    return lines;
  }
};

module.exports = tasksModule;