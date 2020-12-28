const path = require('path')
// express is a function itself
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000 // work in heroku for the port value, locally with 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Poyen Hsieh'
    })
})
 
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Poyen Hsieh'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        messege: 'Call 0927169961 if you need help',
        name: 'Poyen Hsieh'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'andrew',
//         age: 27
//     },{
//         name: 'sarah',
//         age: 29
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<title>About</title><h1>About page</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })      
    }

    // take city name and return latitude, longitude
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        // take latitude and longitude and return weather forcast
        forcast(latitude, longitude, (error, forcastData) =>{
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                forcast: forcastData,
                location,
                you_searched: req.query.address
            })    
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Poyen Hsieh',
        messege: 'Help article not found'
    })
})

// '*' means anything is a match
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Poyen Hsieh',
        messege: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
