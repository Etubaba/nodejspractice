

const User = require('../model/User')


const bcrypt = require('bcrypt')




const newUser = async (req, res) => {

    //destructure username,email, and password from req.body
    const { username, password, email } = req.body

    //check for required fields
    if (!email || !password || !username) return res.status(400).json({ msg: 'All fields are required' })

    //check for duplicate  user
    const duplicateUser = await User.findOne({ username: username }).exec()

    if (duplicateUser) res.status(400).json({ msg: 'User already exists' })



    try {
        //hash password(encryption of password)
        const hashedpassword = await bcrypt.hash(password, 10)


        //create and store the new user all at once

        const newPerson = await User.create({
            username: username,
            email: email,
            password: hashedpassword
        })


        //send the new user to the client
        res.status(201).json({ 'status': true, 'user': newPerson })


    } catch (err) {
        console.log(err.message)
    }


}


module.exports = newUser 