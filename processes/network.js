const si = require('systeminformation');

function getNetworkStartData(){
  return si.networkInterfaceDefault().then((defaultIface) => {
    return Promise.all([
      defaultIface,
      si.networkInterfaces(),
      si.networkStats(defaultIface),
      si.networkConnections()
    ]);
  });
}

module.exports = {
  getNetworkConnections: si.networkConnections,
  getNetworkStartData: getNetworkStartData,
  getNetworkStats: si.networkStats
};