import { BrowserWindow, app, ipcMain } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import dotenv from 'dotenv'

dotenv.config()

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../../dist')

let window: BrowserWindow

async function createWindow() {
    const preload = join(__dirname, '../preload/index.js')

    window = new BrowserWindow({
        width: 1320,
        height: 800,
        minWidth: 1320,
        minHeight: 800,
        maxWidth: 1320,
        maxHeight: 800,
        frame: true,
        transparent: false,
        show: true,
        webPreferences: {
            devTools: true,
            preload,
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: app.isPackaged,
        },
        autoHideMenuBar: true,
    })

    /**
     * Disable GPU acceleration for devices using Windows 7
     */
    if (release().startsWith('6.1')) app.disableHardwareAcceleration()

    const htmlFile = join(__dirname, process.env.DIST_ELECTRON + 'index.html')

    /**
     * If running a development server then use that, if not load a static html file.
     */
    if (process.env.SERVER_URL) {
        window.loadURL(process.env.SERVER_URL)
        window.webContents.openDevTools()
    } else {
        window.loadFile(join(htmlFile))
    }
}

app.whenReady().then(createWindow)

