
const Friend = require('../model/Friend')




//get all friends list (get all data
const getAllData = async (req, res) => {
    const friendList = await Friend.find()
    if (!friendList) res.status(204).json({ msg: 'no data' })
    res.json(friendList)

}

// get single data
const getSingleData = async (req, res) => {
    const id = req?.params?.id
    if (!id) res.sendStatus(400).json({ msg: 'id is required' })
    const theFreind = await Friend.findOne({ _id: id }).exec();
    if (!theFreind) res.status(400).json({ msg: 'user not found' })

    res.json(theFreind)
}



// create new friend by post 
const createNew = async (req, res) => {
    const { firstname, lastname, age } = req.body
    if (!firstname || !lastname || !age) return res.status(400).json({ msg: 'all field are required' })
    try {
        //method 1

        const newFriend = await Friend.create({
            firstname: firstname,
            lastname: lastname,
            age: age,
        })
        res.status(201).json({ 'status': true, 'friend': newFriend })




        //method 2
        // const newFriend = new Friend({
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname,
        //     age: req.body.age
        // })
        // const saveFriend = await newFriend.save()
        // res.json(saveFriend)
    }
    catch (err) {
        console.error(err)
    }


}

//update data

const update = async (req, res) => {
    const id = req.params.id
    if (!id) res.sendStatus(400).json({ msg: 'id is required' })

    const matchFriend = await Friend.findOne({ _id: id }).exec()

    if (matchFriend) {

        matchFriend.firstname = req.body.firstname
        matchFriend.lastname = req.body.lastname
        matchFriend.age = req.body.age

        const updateFriend = await matchFriend.save()

        res.json({ 'status': true, 'friend': updateFriend })


    } else {
        res.status(400).json({ msg: `No friend with ${id} as id` })
    }
}






//delete data

const deleteData = async (req, res) => {
    const id = req.params.id
    if (!id) res.sendStatus(400).json({ msg: 'id is required' })
    const matchFriend = await Friend.findOne({ _id: id }).exec()
    if (matchFriend) {
        const newdata = await Friend.deleteOne({ _id: id });
        res.json(newdata)
    } else {
        res.status(400).json({ msg: 'user not found' })

    }
}


module.exports = { deleteData, update, getAllData, getSingleData, createNew }

