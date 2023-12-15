const express = require('express')
const app = express();
const path = require('path');
const hbs = require('hbs');
const { response, urlencoded } = require('express');
const punycode = require('punycode/');
const request = require('request');
const geocode = require('./Utile/geocode');
const forcast = require('./Utile/forcast');


const htmlStaticPath = path.join(__dirname,"../public");
console.log(htmlStaticPath)

app.set("views",path.join(__dirname,'../template/views'))
app.set("view engine","hbs");
hbs.registerPartials(path.join(__dirname,'../template/partial'))
app.use(express.static(htmlStaticPath));

app.get('/index',(req,res)=>{
    res.render('index',{
        title:"Home",
        name:"This is home page"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"This is about page"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Hiten Mungara"
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            'error':"Please provide address!"
        })
    }

    geocode(req.query.address,(err,{latitude , longitude , location}={})=>{
        if(err){
            return "Error "+err
        }
        forcast(location,(err,forcastdata)=>{
            if(err) return err;
    
            console.log({latitude,longitude,location});
            console.log(forcastdata);
            res.send({
                'forcast':forcastdata,
                "geomap":{location},
                'address':req.query.address
            })
        })
    })

   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Page not found :(",
        name:"Hiten Mungara",
        errorMassage:"404 Error occour!!"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Page not found :(",
        name:"Hiten Mungara",
        errorMassage:"404 Error occour!!"
    })
})



app.listen(3000,()=>{
    console.log("Server started at port 3000");
})