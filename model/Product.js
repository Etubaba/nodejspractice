const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    catId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,


    }
})


module.exports = mongoose.model('Product', productSchema)