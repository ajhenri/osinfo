const si = require('systeminformation');

function getSystemInformation(){
  return Promise.all([
    si.system(),
    si.battery(),
    si.osInfo()
  ]);
}

module.exports = {
  getSystemInformation: getSystemInformation
};