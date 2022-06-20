const Country= require('../model/Country')






const getAllCountries = async (req, res) => {

    const country = await Country.find()
    if (!country) res.status(204).json({ msg: 'no data' })
    res.json({ "status": true, "data": country })
}

module.exports = getAllCountries