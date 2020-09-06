const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../pulic')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rahul Dev'
    })
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About Me',
        name: 'Rahul Dev'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Helping...',
        name: 'Rahul Dev'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address){
        return res.send({
           error: 'Please provide an address' 
        })
    }


    geocode(address, ( error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                address: address,
                forecast: forecastData

            })
            
        })
    
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error : 'Please provide search value'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Rahul Dev',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Rahul Dev',
        errorMessage: 'Page Not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})