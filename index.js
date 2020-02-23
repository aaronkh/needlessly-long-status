process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const LCUConnector = require('lcu-connector')
const fetch = require('node-fetch')

// electron
const { app, BrowserWindow, dialog } = require('electron')
const ipc = require('electron').ipcMain

const connector = new LCUConnector()

const api = {}
let win = null

connector.on('connect', (d) => {
    Object.assign(api, d)
    win.send('ready', true)
})
connector.on('disconnect', () => {
    Object.assign(api, {})
    win.send('ready', false)
})

const getURL = path => `${api.protocol}://${api.address}:${api.port}${path}`

const auth = s => 'Basic ' + Buffer.from(s).toString('base64')

const setStatus = (statusMessage) => {
    const url = getURL('/lol-chat/v1/me')
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth(`${api.username}:${api.password}`)
        },
        body: JSON.stringify({ statusMessage })
    })
}

app.whenReady().then(async () => {
    win = new BrowserWindow({
        show: false,
        width: 333,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
        },
        backgroundColor: '#222',
        resizable: false,
        useContentSize: true,
        frame: false,
        movable: true,
        autoHideMenuBar: true,
        title: 'needlessly-long-status',
    })
    win.loadFile('index.html')
    connector.start()
    win.once('ready-to-show', () => {
        win.show()
    })
})

app.requestSingleInstanceLock()

app.on('second-instance', function () {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
    }
})



// opens links in a browser instead of in app
app.on('web-contents-created', (e, contents) => {
    contents.on('new-window', (e, url) => {
        e.preventDefault();
        require('open')(url);
    });
    contents.on('will-navigate', (e, url) => {
        if (url !== contents.getURL()) e.preventDefault(), require('open')(url);
    });
});

ipc.on('message', (e, d) => {
    setStatus(d)
        .then(() => e.sender.send('message', true))
        .catch(() => e.sender.send('message', false))

})

ipc.on('close', () => win.close())

