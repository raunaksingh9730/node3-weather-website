const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'raunak'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'raunak',
        message:'Hello,please visit on stackoverflow and offical documentation for the solution'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'raunak'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }
    geocode.geocode(req.query.address,(error,{longitude,lattitude,location}={}) => {
        if(error){
            return res.send({
                error:error
            })
        }
        forecast.forecast(longitude,lattitude,(errorforcast,resultforecast)=>{
            if(errorforcast){
                return res.send({
                    error:errorforcast
                })
            }
            res.send({
                location:location,
                forecast:resultforecast
            })
        })
    })
    // res.send({
    //     location:'Ballia',
    //     forecast:'Currently , there is 15 degree temp and there is 0% chance of rains',
    //     address:req.query.address
    // });
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404-page',{
        page:'Help artice',
        name:'raunak'
    })
})

app.get('/about/*',(req,res) => {
    res.render('404-page',{
        page:'About artice',
        name:'raunak'
    })
})

app.get('*',(req,res) => {
    res.render('404-page',{
        page:'Page',
        name:'raunak'
    })
})

app.listen(port,()=>{
    console.log('Server is Up on port no '+port)
})