
const fs = require('fs');
const path = require('path')
const { format } = require('date-fns')
const fsPromises = require('fs').promises

// const { v4: uuid } = require('uuid')

const logEvent = async (message) => {

    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${'mbvb'}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err)
    }

}


const EventEmitter = require('events')

class MyEmitter extends EventEmitter { };
// initialize  
const myEmitter = new MyEmitter()

// add event listener

myEmitter.on('log', (msg) => logEvent(msg));



setTimeout(() => {
    myEmitter.emit('log', 'log event emitter')
}, 2000);



// fs.readFile('./me.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })


// fs.writeFile('./me.txt', 'Hello World', (err) => {
//     if (err) throw err;
//     console.log('File created');
// })

// fs.appendFile('./me.txt', 'node de sweet', (err) => {
//     if (err) throw err;
//     console.log('i don create am');
// })
// if (!fs.existsSync('./new')) {
//     fs.mkdir('./new', (err) => {
//         if (err) throw err
//         console.log('file created')
//     })
// }

module.exports = logEvent