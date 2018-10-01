const util = require('util');
const si = require('systeminformation');
const exec = util.promisify(require('child_process').exec);

/**
 * Get the used memory percentage based on the free and total memory.
 *
 * @param {number} free
 * @param {number} total
 * 
 * @returns {number} The rounded value of the used memory.
 */
function getMemoryUsedPercentage(free, total) {
  const amtFree = 100 * (free/total);
  return Math.round(100 - amtFree);
}

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
 * Get the usage stats of the CPU, RAM and DISK.
 * #TODO: Include memory breakdown in refresh.
 *
 * @returns {object} Object containing percent usage for CPU, RAM, and DISK.
 */
async function getMonitorRefreshData(){
  const cpuLoad = await si.currentLoad();
  const diskSpaceUsed = await getDf();
  const memory = await si.mem();

  const memoryUsed = getMemoryUsedPercentage(memory.free, memory.total);

  return {
    cpuPercentage: cpuLoad.currentload,
    diskPercentage: diskSpaceUsed,
    memPercentage: memoryUsed
  };
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
    const memoryUsed = getMemoryUsedPercentage(memory.free, memory.total);
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
        layout: memoryLayout,
        percentage: memoryUsed
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
  getMonitorStartData: getMonitorStartData,
  getMonitorRefreshData: getMonitorRefreshData
};