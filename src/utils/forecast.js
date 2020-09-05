const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c715171e4af2273e2fcfd4b5337de14&query='+latitude+','+longitude+'&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to Weather Stack', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, 'it is currently ' + body.current.temperature + ' degress outside')
        }
    })
}
module.exports = forecast