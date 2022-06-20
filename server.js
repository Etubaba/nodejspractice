//express server 
require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConfig')

const app = express()


//connect to mongoDB
connectDB();


//type:module =>for new import statements
//middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')))




// middleware for json data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.use('/', require('./routes/apimethods'))
app.use('/', require('./routes/products'))
app.use('/', require('./routes/category'))
app.use('/', require('./routes/handleregister'))
app.use('/', require('./routes/handlelogin'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/countryFetch'))




// app.use(bodyParser.json({ limit: '150mb' }));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     limit: '150mb',
//     extended: true
// }));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())



const PORT = process.env.PORT || 3500

//sending just hello world to the client in / route =>

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })



// app.put('/api/data/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const found = data.some(item => item.id === id)
//     console.log(found)

//     if (found) {
//         const updateUser = res.body
//         data.forEach(item => {

//             if (item.id === id) {
//                 data.name = updateUser.name ? updateUser.name : data.name
//                 data.email = updateUser.email ? updateUser.email : data.email
//                 data.age = updateUser.age ? updateUser.age : data.age
//                 res.json(data, { msg: ' user updated ' })
//             }

//         })



//         // delete user data in api/data/:id route =>




//         app.delete('/api/data/:id', (req, res) => {
//             const id = Number(req.params.id)
//             const found = data.some(item => item.id === id)
//             if (found) {
//                 data.filter(item => item.id !== id)
//                 res.json({ msg: 'user deleted' }, data)
//             } else {
//                 
//             }

//         })







//     } else {
//         res.status(400).json({ msg: 'user no de' })
//     }




// })



//sending a file to the client in /about route =>
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})



app.get('/mmm(.html)?', (req, res) => {
    res.redirect(301, '/')
})




mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) })
})





