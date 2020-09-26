const request = require("request");
const geocode = (address, callback) =>{
  console.log(address+"twts");
  const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiamFzd2FudGgwMDUiLCJhIjoiY2tiajhwcHFsMG12YzJwcW5va2xyd3dlZyJ9.FmDqFYkUkr61M4qbbfuOyg"
 
  request({url, json:true},(error,{body}={})=>{
   if(error){
     //console.log('unable to connect');
     callback('unable to connect',undefined);
   } else if(body.features.length == 0){
    //console.log('Not found try again');
    callback('Not found try again',undefined);
   } else{
    const longtitude =body.features[0].center[0]
   const latitude =body.features[0].center[1]
    //console.log(longtitude,latitude);
    //console.log(response.body)
    callback(undefined,{
   longtitude:longtitude,
   latitude:latitude,
   place:body.features[0].place_name
    })
   }
    
  })
 }

 module.exports = geocode;