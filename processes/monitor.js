const si = require('systeminformation');

function getMonitorStartData(){
  return Promise.all([
		si.cpu(),
    si.cpuCurrentspeed(),
	  si.currentLoad(),
    si.cpuCurrentspeed(),
    si.mem(),
    si.memLayout(),
    si.diskLayout(),
    si.graphics()
  ]);
}

module.exports = {
  getMonitorStartData: getMonitorStartData,
  getCpuPercentage: si.currentLoad
};