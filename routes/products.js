const express = require('express');
const router = express.Router()
const { getAllProducts, getSingleProduct, updateProduct, deleteProduct, createProduct } = require('../controller/productController')




router.get('/product', getAllProducts)

router.post('/product', createProduct)

router.get('/product/:id', getSingleProduct)

router.put('/product/:id', updateProduct)

router.delete('/product/:id', deleteProduct)



module.exports = router