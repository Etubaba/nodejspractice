const Category = require('../model/Category');










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

    const { name } = req.body
    if (!name || !req.file.filename ) res.sendStatus(400).json({ 'msg': 'All fields required' })
    console.log('image', req.file)

try{
 const newCategory = await Category.create({
            name: name,
            image: req.file.path
        })

        res.json({ 'status': true, 'data': newCategory })

}catch(e){console.error(e.message)}
        // const newCategory = new Category({
        //     name: name,
        //     image: {
        //         data:req.file.filename,
        //         contentType:'image/png'
        //     }
        // })
        // const created = await newCategory.save()
        // .then(()=>res.status(201).json({status:true, data:created}))
        // .catch(err=>console.log(err.message))





        
  //  }
  // })
        
 
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