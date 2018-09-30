const electron = require('electron');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', function () {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
});