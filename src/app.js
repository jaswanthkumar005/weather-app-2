const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname);
console.log(path.join(__dirname,"../"))
const app = express()
const port= process.env.PORT || 3000
// define path for express config
const publicDirectory = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")
//setup static directory to serve
app.use(express.static(publicDirectory))
hbs.registerPartials(partialPath)
//setup handlers bars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
app.get('',(req,res) => {
  res.render('index',{
    title:"Weather App",
    name:"Jaswanth"
  })
  
})
app.get('/help',(req,res) => {
   res.render('help',{
    title:"Help",
    Helptext:"This the help text",
    name:"Jaswanth"
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title:"About me",
    name:"Jaswanth"
  })
})


app.get('/weather',(req,res) => {
  const address = req.query.address
  if(!address){
    return res.send({
      error:"No address"
    })
  }
  console.log(address)
  geocode(address,(error,{longtitude,latitude,place} = {}) => {
    if(error){
      return res.send({
        error
      })
    }

    forecast(longtitude,latitude, (error,forecastData)=>{
      if(error){
        return res.send({
          error
        })
      }
     res.send({
        place:place,
        forecast:forecastData,
        address:req.query.address
      })
    })
  })
})

app.get('/products',(req,res) => {
  console.log(req.query)
  if(!req.query.search){
    return res.send({
      error:"You Must provide search term"
      
    })
  }
 res.send({
   products:[]
 })
})
app.get('/help/*',(req,res)=>{
  res.render("404", {
    title:"404",
    errorMessage:"Help Article Not foundv.",
    name:"jaswanth"
  })
})

app.get('*',(req,res)=>{
  res.render("404", {
    title:"404",
    errorMessage:"Page Not Found",
    name:"jaswanth"
  })
})

app.listen(port,()=>{
 console.log("server up to "+port);
})