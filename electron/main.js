const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

let mainWindow;
let staticServer;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

function startStaticServer(distPath) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        let reqPath = decodeURI(req.url.split('?')[0]);
        if (reqPath === '/' || reqPath.endsWith('/')) {
          reqPath = path.join(reqPath, 'index.html');
        }
        let filePath = path.join(distPath, reqPath);

        if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
          filePath = filePath + '.html';
        }

        fs.readFile(filePath, (err, data) => {
          if (err) {
            const fallback = path.join(distPath, 'index.html');
            if (fs.existsSync(fallback)) {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(fs.readFileSync(fallback));
              return;
            }
            res.writeHead(404);
            res.end('Not found');
            return;
          }

          const ext = path.extname(filePath).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        });
      } catch (e) {
        res.writeHead(500);
        res.end('Internal server error');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });

    server.on('error', reject);
  });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 950,
    minWidth: 1200,
    minHeight: 750,
    title: 'Prototipo Carrito Inteligente (DSI)',
    backgroundColor: '#f8fafc',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  const devUrl = 'http://localhost:3000';

  if (isDev && process.env.ELECTRON_START_URL) {
    await mainWindow.loadURL(process.env.ELECTRON_START_URL);
  } else if (isDev && !fs.existsSync(path.join(__dirname, '..', 'out', 'index.html'))) {
    await mainWindow.loadURL(devUrl);
  } else {
    // Production / packaged mode: serve from out directory
    const distPath = path.join(__dirname, '..', 'out');
    const { server, port } = await startStaticServer(distPath);
    staticServer = server;
    await mainWindow.loadURL(`http://127.0.0.1:${port}`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (staticServer) {
      staticServer.close();
      staticServer = null;
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (staticServer) {
    staticServer.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
