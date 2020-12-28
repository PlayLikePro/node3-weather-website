const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2fa5789d91986e13861d63c4760f0450&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body: resBody }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (resBody.error){
            callback("something's wrong! " + resBody.error.info)
        } else {
            const data = resBody.current
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degrees out.')
        }
    })
}

module.exports = forcast