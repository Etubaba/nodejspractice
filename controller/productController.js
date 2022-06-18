const Product = require('../model/Product')


//handle get all products

const getAllProducts = async (req, res) => {
    const product = await Product.find()
    if (!product) res.status(204).json({ msg: 'no data' })
    res.json({ "status": true, "data": product })
}

//get single product

const getSingleProduct = async (req, res) => {
    const id = req.params.id
    if (!id) res.sendStatus(400).json({ 'msg': 'id parameter required' })
    const product = await Product.findOne({ _id: id }).exec()
    if (!product) res.sendStatus(400).json({ 'msg': 'product not found' })
    res.json({ "status": true, "data": product })


}

//get Product by userId

const getProductByUserId =async (req,res)=>{
    const userId = req.params.id
    if (!userId) res.sendStatus(400).json({ 'msg': 'userId is required' })

    const product = await Product.find({userId:userId})
    if (!product) res.sendStatus(400).json({ 'msg': 'No product match the userId' })
    res.json({ "status": true, "data": product })

}






//get Product by categoryID
const getProductByCategoryId = async (req, res) => {
    const catId = req.params.id
    if (!catId) res.sendStatus(400).json({ 'msg': 'category Id is required' })
    const product = await Product.find({catId:catId})
    if (!product) res.sendStatus(400).json({ 'msg': 'No product match the category Id' })
    res.json({ "status": true, "data": product })

}





//delete product 

const deleteProduct = async (req, res) => {
    const id = req.params.id
    if (!id) res.sendStatus(400).json({ 'msg': 'id parameter required' })

    const matchedProduct = await Product.findOne({ _id: id }).exec()

    if (matchedProduct) {
        await Product.deleteOne()
        res.json({ 'status': true, 'msg': `product with id of ${id} delected` })
    } else {
        res.sendStatus(400).json({ ' msg': 'product not found' })
    }
}

//create new product
const createProduct = async (req, res) => {
    const {title, description,userId,catId,price,countryCode} = req.body
    const fileArr=req?.files.map(file=>file.path)
    if (!title || !description || !userId || !catId || !price || !countryCode) {
        return res.status(400).json({ 'msg': 'All field are required' })
    }
    try {

        const newProduct = await Product.create({
            title: title,
            description: description,
            userId:userId,
            catId: catId,
            price: price,
            countryCode:countryCode,
            image: fileArr
        })

        res.json({ 'status': true, data: newProduct })

    } catch (err) { console.error(err) }
}


//update product 

const updateProduct = async (req, res) => {
    const id = req.params.id
    if (!id) res.sendStatus(400).json({ 'msg': 'id is required' })

    const matchedProduct = await Product.findOne({ _id: id }).exec()

    if (matchedProduct) {
        matchedProduct.title = req.body.title,
            matchedProduct.price = req.body.price,
            matchedProduct.description = req.body.description,
            matchedProduct.image = req.body.image

        const updatedProduct = await matchedProduct.save()

        res.json({ 'status': true, 'friend': updatedProduct })
    } else {
        res.sendStatus(400).json({ 'msg': 'No product match the id' })
    }

}

module.exports = { getAllProducts, getSingleProduct,
     deleteProduct, createProduct, updateProduct,
     getProductByUserId,getProductByCategoryId }