

const User = require('../model/User')
const bcrypt = require('bcrypt')


const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) res.status(400).json({ msg: 'All field are required' })
    try{
    const found = await User.findOne({ username: username }).exec()
    if (!found) res.sendStatus(401).json({ msg: 'User not found' })
    const match = await bcrypt.compare(password, found.password)

    if (match) {
        res.json({ 'status': true, 'msg': 'Login successful' })
    } else {
        res.sendStatus(401).json({'msg': 'Invalid password' })
    }

      }catch(err){console.error(err);}


}


module.exports = login