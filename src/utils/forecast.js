const request = require('request');

const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e129c91dab69b026190bad58c96a921a&query='+longitude+','+latitude;
    request({ url, json : true }, (error, {body}) => {
        if(error){
            callback('Unable to Connect With Weather Servie',undefined)
        }else if(body.error){
            callback('Unable to find Location',undefined)
        }
        else{
            callback(undefined,'It is currently '+body.current.temperature+' degree and chance of rain is:'+body.current.precip);
        }
    })
}

exports.forecast =  forecast;