const express = require('express');
const multer= require('multer');

const router = express.Router()
const { getAllProducts, getSingleProduct, updateProduct, deleteProduct, createProduct, getProductByUserId, getProductByCategoryId } = require('../controller/productController')


const { storage } = require('../config/storage');
const upload= multer({ storage:storage });

router.get('/product', getAllProducts)

router.post('/product',upload.array('image'), createProduct)

router.get('/product/:id', getSingleProduct)
router.get('/product/cat/:id',getProductByCategoryId )
router.get('/product/user/:id',getProductByUserId)

router.put('/product/:id', updateProduct)

router.delete('/product/:id', deleteProduct)



module.exports = router