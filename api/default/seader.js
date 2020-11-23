require('../model/database')
const Country = require('../model/country')
const State = require('../model/state')
const City = require('../model/city')

const countryData = require('../default/Country_City_State_JSONData/country')
const stateData = require('../default/Country_City_State_JSONData/state')
const cityData = require('../default/Country_City_State_JSONData/city')


const runDefaultScript = async () => {
    try {
        let countryRes = await Country.insertMany(countryData)
        let stateRes = await State.insertMany(stateData)
        let cityRes = await City.insertMany(cityData)
        
        if(countryRes && stateRes && cityRes) {
            // console.log('County, State & City data saved Successfully !!!');
        }
    } catch (error) {
        // console.log(error);   
    }
}

runDefaultScript()
