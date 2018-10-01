const { ipcRenderer } = require('electron');
const monitor = require('electron').remote.require('./processes/monitor');

function refreshMonitorData(){
  return monitor.getMonitorRefreshData().then((data) => {
    ipcRenderer.send('refresh-monitor-data', data);
  });
}

refreshMonitorData();
setInterval(refreshMonitorData, 1000);