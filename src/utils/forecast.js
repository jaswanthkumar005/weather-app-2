const request = require("request")
const forecast = (longitude,latitude,callback) =>{

  const url ="http://api.weatherstack.com/current?access_key=303b46b277d86f46312f30e7ca252ddb&query="+longitude+","+latitude+"&units=f"

request({url:url,json:true},(error,response) =>{
  //const data = JSON.parse(response.body)
  console.log(response.body.current);
 if(error){
   //console.log("unable to connect");
   callback("unable to connect",undefined)
 } else if(response.body.error){
  callback("unable to find coordinates",undefined)
 // console.log("unable to find coordinates")
 } else {
 // console.log(response.body.current.weather_descriptions[0]+". current temperature "+
  //  response.body.current.temperature+" but it feels like "+response.body.current.feelslike);
  

    callback(undefined,response.body.current.weather_descriptions[0]+". current  test temperature "+
    response.body.current.temperature+" but it feels like "+response.body.current.feelslike
    +"humbity is "+response.body.current.humidity+"%")
 }
  
})

}

module.exports = forecast;