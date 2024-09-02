const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  loadYaml: (callback) => ipcRenderer.on('load-yaml', (event, yamlContent) => callback(yamlContent)),
});
