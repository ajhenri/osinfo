const os = require('os');
const si = require('systeminformation');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Get the SSID (Service Set Identifier) for the WLAN network.
 * Uses the built-in Airport tool.
 *
 * @returns {string} The SSID of connected network.
 */
async function getSSID(){
  const airport = exec('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I');
  return airport.then((data) => {
    const matches = data.match(/SSID.*/g);
    if(matches[1]){
      return matches[1].split('SSID: ')[1];
    }
  }).catch((error) => {
    throw new Error(error);
  });
}

/**
 * Gets the public IP address assigned to device.
 *
 * @returns {string} IP address.
 */
async function getIPAddress(){
  const ifaces = os.networkInterfaces();
  for(const i in ifaces){
    const iface = ifaces[i];
    for(const addr in iface){
      if(iface[addr].family == 'IPv4' && !iface[addr].internal){
        return iface[addr].address;
      }
    }
  }
}

/**
 * Collect information for the system information page.
 * @borrows system-information
 *
 * @returns {object}
 */
async function getSystemInformation(){
  try {
    const ssid = await getSSID();
    const system = await si.system();
    const battery = await si.battery();
    const osInfo = await si.osInfo();
    const ipAddr = await getIPAddress();

    return {
      ip: ipAddr,
      ssid: ssid,
      battery: {
        percent: battery.percent,
        ischarging: battery.ischarging
      },
      model: system.model,
      distro: osInfo.distro,
      release: osInfo.release,
      platform: osInfo.platform,
      hostname: osInfo.hostname,
      arch: osInfo.arch
    };
  } catch(error) {
    throw new Error(error);
  }
}

module.exports = {
  getSystemInformation: getSystemInformation
};