const mongoose = require('mongoose');

const { Schema } = mongoose;


const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,

    }
})

module.exports = mongoose.model('Category', categorySchema);