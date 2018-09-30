const util = require('util');
const si = require('systeminformation');
const exec = util.promisify(require('child_process').exec);

/**
 * Get the available disk space for the main filesystem.
 *
 * @returns {number} The percent of disk used.
 */
async function getDf(){
  const df = exec('df -h');
  return df.then((data) => {
    const rows = data.split(/\n/);
    for(let i=0; i<rows.length; i++){
      const cols = rows[i].split(/\s+/);
      if(cols[8] && cols[8] == '/'){
        return parseInt(cols[7], 10);
      }
    }
  }).catch((error) => {
    throw new Error(error);
  });
}

/**
 * Gets all the data needed for the monitoring view. This includes data relating to
 * the system's CPU, memory and disk.
 *
 * @returns {object} Object describing cpu, memory, and disk.
 */
async function getMonitorStartData(){
  try {
    const cpu = await si.cpu();
    const cpuLoad = await si.currentLoad();
    const cpuCurrentspeed = await si.cpuCurrentspeed();
    const memory = await si.mem();
    const memoryLayout = await si.memLayout();
    const diskLayout = await si.diskLayout();
    const diskSpaceUsed = await getDf();

    return {
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        speed: cpu.speed,
        cores: cpu.cores,
        cache: cpu.cache,
        avgSpeed: cpuCurrentspeed.avg,
        minSpeed: cpuCurrentspeed.min,
        maxSpeed: cpuCurrentspeed.max,
        percentage: cpuLoad.currentload
      },
      memory: {
        total: memory.total,
        free: memory.free,
        used: memory.used,
        active: memory.active,
        buffcache: memory.buffcache,
        available: memory.available,
        swaptotal: memory.swaptotal,
        swapused: memory.swapused,
        swapfree: memory.swapfree,
        layout: memoryLayout
      },
      disk: {
        layout: diskLayout,
        percentage: diskSpaceUsed
      }
    };
  } catch (error){
    throw new Error(error);
  }
}

module.exports = {
  getMonitorStartData: getMonitorStartData
};