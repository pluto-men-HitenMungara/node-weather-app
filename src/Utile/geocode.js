const request = require('request');

const geocode=(address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGl0ZW4yMSIsImEiOiJjbHE1M2FxamUwY3hrMmtvaGcwcWo2aDdyIn0.ftwnruxsfWTGlxzmHd_nQQ`;
    
    request({url , json:true},(err,{body}={})=>{
        // console.log(response.body.features)
        if(err){
            callback("Unable to connect",undefined)
        }else if(body.features.length=== 0){
            callback("No data found ", undefined);
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode