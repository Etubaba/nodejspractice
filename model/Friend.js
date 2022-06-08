const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const friendsSchema = new Schema({
    firstname: {
        type: String,
        required: true

    },

    lastname: {
        type: String,
        required: true

    },
    age: {
        type: Number,
        required: true

    }
})



module.exports = mongoose.model('Friend', friendsSchema)