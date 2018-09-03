const os = require('os');
const si = require('systeminformation');

const cpus = os.cpus();

function getCPUCores(){
	let cores = [], 
	coreCount = 1;
	for(const i in cpus){
		const cpu = cpus[i];
		
		let totalSinceBoot = 0, //user+nice+system+idle+iowait+irq+softirq+steal
			totalIdleSinceBoot = 0, //idle + iowait
			totalUsageSinceBoot = 0, //total CPU time since boot - total CPU Idle time since boot 
			totalPercentage = 0; //total CPU usage time since boot/total CPU time since boot X 100

		for(const type in cpu.times){
			totalSinceBoot += cpu.times[type];
		}
		totalIdleSinceBoot = cpu.times['idle'];
		totalUsageSinceBoot = totalSinceBoot - totalIdleSinceBoot;
		totalPercentage = Math.round((totalUsageSinceBoot/totalSinceBoot)*100);

		cores.push({
			core: coreCount,
			model: cpu.model,
			totalSinceBoot: totalSinceBoot,
			totalIdleSinceBoot: totalIdleSinceBoot,
			totalUsageSinceBoot: totalUsageSinceBoot,
			totalPercentage: totalPercentage
		});
		coreCount++;
	}

	let cpuPercentage = 0;
	for(const k in cores){
		cpuPercentage += cores[k].totalPercentage;
	}
	
	return {
		coreInformation: cores,
		percentage: cpuPercentage
	};
}


function getCPUInformation(){
  return Promise.all([
		si.cpu(),
    si.cpuCurrentspeed(),
		getCPUCores()
  ]);
}

module.exports = {
  getCPUInformation: getCPUInformation
};