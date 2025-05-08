const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

let win;

function createWindow() {
  const iconPath = path.join(__dirname, 'Bilder', 'ClimbTime Logo_pur.png');
  console.log('→ Prüfe Icon-Pfad:', iconPath);
  console.log('→ Existiert die Datei?', fs.existsSync(iconPath));

  win = new BrowserWindow({
    width: 2560,
    height: 1600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

function navigateToAnchor(anchor) {
  if (win) {
    win.loadFile('index.html').then(() => {
      win.webContents.executeJavaScript(`
        location.hash = '${anchor}';
        window.scrollTo(0, document.querySelector('${anchor}').offsetTop);
      `);
    });
  }
}

app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate([
    {
      label: 'App',
      submenu: [
        { role: 'about', label: 'Über diese App' },
        { type: 'separator' },
        { role: 'quit', label: 'Beenden' }
      ]
    },
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Home',
          click: () => {
            if (win) {
              win.loadFile('index.html');
            }
          }
        },
        {
          label: 'Woche 1/2',
          click: () => navigateToAnchor('#trainings')
        },
        {
          label: 'Woche 3/4',
          click: () => navigateToAnchor('#workout2')
        },
        {
          label: 'Woche 5/6',
          click: () => navigateToAnchor('#workout3')
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
