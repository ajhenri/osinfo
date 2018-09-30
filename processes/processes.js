const si = require('systeminformation');

/**
 * Get the list of processes running on system (exclude sleeping processes).
 *
 * @returns {array} List of processes with information.
 */
function getProcesses(){
  return new Promise((resolve, reject) => {
    si.processes().then((data) => {
      let filteredProcesses = [];
      for(const ps in data['list']){
        if(data['list'][ps].state != 'sleeping'){
          filteredProcesses.push(data['list'][ps]);
        }
      }
      resolve(filteredProcesses);
    });
  });
}

module.exports = {
  getProcesses: getProcesses
};