const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = 3001
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

console.log(__dirname)

//Setupp handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//Setup static directory to serv
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  console.log('The directory name is: ', __dirname)
  res.render('index', {
    //render tamplet bar
    title: 'Weather',
    name: 'Yair Abranyi',
    ad: 'gogo'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Yair Abranyi'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title1: 'Getting started',
    title2: 'Examples',
    title3: 'Good luck!',
    title: 'Help',
    name: 'Yair Abranyi'
  })
})

app.get('/weather', (req, res) => {
  console.log("address is: ", req.query.address)
  if (!req.query.address) {
    return res.send({
       error: 'You must provide an address'
    })
  }
  console.log('The Address is: ', req.query.address)

  geocode(req.query.address, (error, { latitude, longitude, location }= {}) => {
    if (error) {
      return res.send({ error })
    }
 
    forecast( latitude, longitude,  (error, forecastDate)=>{
      if(error){
        return res.send({error})
      }
     res.send({
       forecast: forecastDate,
       location,
       address: req.query.address
     }) 
    })
  })
  // res.send([
  //   {
  //     address: req.query.address,
  //     country: 'Israel',
  //     forecast: 'partly suny'
  //   }
  // ])
})

app.get('/products', (req, res) => {
  console.log(req.query)
  if (!req.query) {
    return res.send({
      error: 'you must provide search tearm'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yair Abranyi',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Yair Abranyi',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`server started at port 3001 ${port}`)
})
