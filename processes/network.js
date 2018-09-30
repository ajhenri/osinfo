const si = require('systeminformation');

/**
 * Gets data for network interfaces, stats, and connections.
 *
 * @returns {object} All encompassing object describing network information.
 */
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