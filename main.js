const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const iconPath = path.join(__dirname, 'Bilder', 'ClimbTime Logo_pur.png');
  console.log('→ Prüfe Icon-Pfad:', iconPath);
  console.log('→ Existiert die Datei?', fs.existsSync(iconPath));

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
