const request = require('request');
const geocode = (location,callback)=>{
    const cordinateUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoicmF1bmFrc2luZ2giLCJhIjoiY2t3emMydXMzMDFtNDJwbXgybjJpMjBuaCJ9.YtbolsLJ5CiOG_0PuM6KAQ';
    request({url : cordinateUrl,json:true} , (error, response) => {
        if(error){
            callback('Unable to connect with the GeoCoding Service',undefined);
        }else if(response.body.message){
            callback(response.body.message,undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location',undefined);
        }
        else{
            const longitude = response.body.features[0].center[1];
            const latitude = response.body.features[0].center[0];
            const place = response.body.features[0].place_name;
            const cordinte = {
                'longitude' : longitude,
                'latitude' : latitude,
                'location' : place
            }
            callback(undefined,cordinte);
        }
    })
}
exports.geocode = geocode;