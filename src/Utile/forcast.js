const request = require('request');

const forcast = (address , callback)=>{
    const url =  `http://api.weatherapi.com/v1/current.json?key=30f38b5f61cb4e38939100246231412&q=${address}&aqi=yes`

    request({url , json:true},(err,{body}={})=>{
        if(err){
            callback("Unable to weather service !",undefined)
        }else if(body.err){
            callback("Unable to location find!",undefined)
        }else{
            callback(undefined,"Envrionment of "+address+" is "+body.current.condition.text +"\nTempreture is "+body.current.temp_c)
        }
    })
}

module.exports=forcast;