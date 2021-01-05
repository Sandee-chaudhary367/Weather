const path = require('path')
const fs=require("fs")
const express = require('express')
const hbs = require('hbs')
const GeoCode=require("./util/Geocode");
const forcast=require("./util/forcast");
const app = express();
const port=process.env.PORT||3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sandeep Chaudhary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sandeep Chaudhary'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sandeep Chaudhary'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    GeoCode(req.query.address,(error,data1)=>{
            if(error){
               return res.send({
                   error 
                })
            }
            forcast(data1.latitude,data1.lontitude,(error,data)=>{
                 if(error){
                    res.send({
                       error 
                     });
                 }
                 else{
                    res.send({
                       forcast:`${data.WeatherDescriptions},the temperature is ${data.temperature} degree celsius,It feels ${data.feels} like degree celsius.`,
                      place: data1.place
                    })
                 }
            })
               
            
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sandeep Chaudhary',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sandeep Chaudhary',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})