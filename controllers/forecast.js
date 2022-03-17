const request = require('request')
const { weatherAPI } = require('../config/configuration')

function forecast(address, callback){
    const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${address}`

    request({url:url, json:true}, (error, response) => {
        //error handling for physical/system errors
        if (error){
            callback("Cannot connect to the forecast service. Make sure you're connected to the internet.", undefined)
        }
        //error handling for bad response, when the user Input is wrong/bad
        else if (response.body.success === false){
            callback("Oops! Did you type the name of your location correctly? Please type again.", undefined)
        }
        //No error
        else {
            //Grabbing the location, temperature and feelslike values from the JSON response coming through the API
            location = response.body.request.query
            temperature = response.body.current.temperature
            feelslike = response.body.current.feelslike
            
            callback(undefined, {'location': location, 'temperature': temperature, 'feelslike': feelslike})
        }
    })
}

module.exports = forecast

//How to use the forecast() function
// forecast('Kathmandu', (error, kathforecast) => {
//     if (error){
//         console.log(error)
//     }
//     else {
//         console.log(kathforecast);
//     }   
// })
