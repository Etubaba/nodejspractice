
const mongoose = require('mongoose')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {Schema} = mongoose
//fetchCountries() 


const countrySchema = new Schema({
     code:{type:String,required:true},
     name:{type:String,required:true},
     symbol:{type:String,required:true},
})

const Country=mongoose.model('Country', countrySchema)

async function fetchCountries(){

    const response = await fetch('https://api.crystalmol.com/api/users/list/country')
    const countries = await response.json()
   const {data}=countries
   console.log(data)
    for(let j =0; j < data.length; j++) {
    //  for(let  i in countries) {
        console.log(countries)
         const country = new Country({
           code: data[j].code,
           name: data[j].name,
           symbol: data[j].symbol
           })

country.save().then(res=>console.log('saved successfully')).catch(err=>console.log(err));
    }    
}


module.exports = Country