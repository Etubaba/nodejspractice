// const logEvents = require('./logEvent')

const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
const http = require('http')

// const EventEmitter = require('events')

// class Emitter extends EventEmitter { };
// // initialize  
// const myEmitter = new Emitter()

// add event listener

// myEmitter.on('log', (msg) => logEvents(msg));


// myEmitter.emit('log', 'log event emitter')


const PORT = process.env.PORT || 3500




// function that handle serving of file 

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawdata = await fsPromises.readFile(filePath,
            !contentType.includes('image') ? 'utf8' : ''

        );
        const data = contentType === 'application/json' ? JSON.parse(rawdata) : rawdata
        response.writeHead(200, { 'contentType': contentType })
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )

    } catch (err) {
        console.log(err)
        response.statuscode = 500
        response.end()
    }

}


const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    const extention = path.extname(req.url)
    let contentType;

    switch (extention) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }


    let filePath = contentType = 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html') : contentType = 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html') :
            contentType = 'text/html' ?
                path.join(__dirname, 'views', req.url) :
                path.join(__dirname, req.url)

    //makes the .html ext not required when inputing url in the browser
    if (!extention && req.url.slice(-1) !== '/') {
        filePath += '.html';
    }
    const fileExist = fs.existsSync(filePath)

    if (fileExist) {
        //serve the file 
        serveFile(filePath, contentType, res)
    } else {
        //404 or redirecting 
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'location': '/new-page.html' })
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301, { 'location': '/' })
                res.end()
                break;
            default:
                //404 serving
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }



})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


