const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaHNpZWgtcG95ZW4iLCJhIjoiY2tpazBvaDFsMDU5djJ6cWhmY3Jpb2xqciJ9.okLtqENTNSXPkX2Evw5UmQ&limit=1'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode server!', undefined)
        } else if (!body.features[0]) {
            callback("Something's wrong! Cannont find the location", undefined)
        } else {
            const coordinate = body.features[0].center
            const longitude = coordinate[0]
            const latitude = coordinate[1]
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode