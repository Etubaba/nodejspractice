const express = require('express');
const router = express.Router()
const { getAllCategories, updateCategory, deleteCategory, createCategory } = require('../controller/categoryController')




router.get('/category', getAllCategories)

router.post('/category', createCategory)

router.put('/category/:id', updateCategory)

router.delete('/category/:id', deleteCategory)



module.exports = router