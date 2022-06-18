const user = require('../model/User');

const getAllUsers = async (req, res) => {

    const allUsers = await user.find();
    if (!allUsers) res.status(204).json({ msg: 'no data' });
    res.json(allUsers);
}

const getSingleUser= async (req, res) => {
    const id =req.params.id;
    if (!id) res.status(404).json({ msg: 'Id required'})
    const users=await user.findOne({_id:id});
    if(!users) res.status(400).json({ msg: 'no data' });
    res.json(users);
}

module.exports={getAllUsers, getSingleUser}