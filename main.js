const { app, BrowserWindow, dialog, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const jsyaml = require('js-yaml');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Open YAML File',
          click: () => {
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [{ name: 'YAML Files', extensions: ['yaml', 'yml'] }]
            }).then(result => {
              if (!result.canceled) {
                const filePath = result.filePaths[0];
                const yamlContent = fs.readFileSync(filePath, 'utf8');
                const parsedContent = jsyaml.load(yamlContent);
                mainWindow.webContents.send('load-yaml', parsedContent);
              }
            }).catch(err => {
              console.error('Failed to open file dialog:', err);
            });
          }
        },
        { role: 'quit' }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
