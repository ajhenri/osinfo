const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, ipcMain } = electron;
const url = require('url');

let win = null, winMonitor = null;

/**
 * Creates the main app window.
 */
function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});

  // Load main app file.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  
  win.on('closed', function () {
    win = null;
  });
}

/**
 * Creates a hidden window that will run tasks in the background.
 */
function createBackgroundProcess(){
  // Set hidden window that doesn't block main UI thread.
  winMonitor = new BrowserWindow({ width: 400, height: 400, show: false });

  // Loads background file containing script.
  winMonitor.loadURL(url.format({
    pathname: path.join(__dirname, 'background.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Send contents of monitor refresh to renderer.
  ipcMain.on('refresh-monitor-data', function(event, arg){
    win.webContents.send('refreshed-monitor-data', arg);
  });
}

app.on('ready', function (){
  createWindow();
  createBackgroundProcess();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
  if(winMonitor === null) {
    createBackgroundProcess();
  }
});