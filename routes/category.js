const express = require('express');
const router = express.Router()
const { getAllCategories, updateCategory, deleteCategory, createCategory } = require('../controller/categoryController')

const multer=require('multer');
const { storage } = require('../config/storage');
const upload= multer({ storage:storage });


router.get('/category', getAllCategories)

router.post('/category',upload.single('image'), createCategory)

router.put('/category/:id', updateCategory)

router.delete('/category/:id', deleteCategory)



module.exports = router