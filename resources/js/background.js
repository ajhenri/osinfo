const { ipcRenderer } = require('electron');
const monitor = require('electron').remote.require('./processes/monitor');

/**
 * Calls the monitor function to refresh CPU, memory and disk data. It then 
 * sends an IPC message with that data back to the main process.
 *
 * @returns void
 */
function refreshMonitorData(){
  return monitor.getMonitorRefreshData().then((data) => {
    ipcRenderer.send('refresh-monitor-data', data);
  });
}

refreshMonitorData();
// Run the refresh every second.
setInterval(refreshMonitorData, 1000);