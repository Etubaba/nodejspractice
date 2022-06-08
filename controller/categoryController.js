const Category = require('../model/Category');
const Product = require('../model/Product');

//get All Categories


const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    if (!categories) res.status(204).json({ msg: 'no data' })
    res.json({ "status": true, "data": categories })
}



// delete category
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    if (!id) res.sendStatus(400).json({ 'msg': 'id parameter required' })

    const matchedCategory = await Category.findOne({ _id: id }).exec();
    if (matchedCategory) {
        await Category.deleteOne()
        res.json({ 'status': true, 'msg': `category with id of ${id} delected` })
    } else {
        res.sendStatus(400).json({ ' msg': 'category not found' })
    }
}























//post new category 
const createCategory = async (req, res) => {
    const { name, image } = req.body
    if (!name || !image) res.sendStatus(400).json({ 'msg': 'All fields required' })

    try {
        const newCategory = await Category.create({
            name: name,
            image: image
        })
        console.log(newCategory)
        res.json({ 'status': true, 'data': newCategory })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: 'Operation failed' });
    }
}


//update category

const updateCategory = async (req, res) => {
    const id = req.params.id;
    if (!id) res.sendStatus(400).json({ 'msg': 'id parameter required' })

    const matchedCategory = await Category.findOne({ _id: id }).exec();

    if (matchedCategory) {
        matchedCategory.name = req.body.name
        matchedCategory.image = req.body.image

        const updated = await matchedCategory.save()
        res.json({ 'status': true, 'data': updated })
    }
}


module.exports = { updateCategory, createCategory, deleteCategory, getAllCategories }