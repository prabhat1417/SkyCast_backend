const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
require('dotenv').config()

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){
  const city =req.body.Cityname;
  const url = process.env.url+city+process.env.id
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const weather = weatherdata.weather[0].description 
      const icon = weatherdata.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<html>");
      res.write("<h4>Weather Condition in "+city+" : " + weather + ".</h4>");
      res.write("<h1>Temperature in "+city+" is " + temp + " degree Celsius.</h1>");
      res.write("<img src="+imageURL+">");
      res.write("</html>");
      res.send()
    })
  })
});

app.listen(3000,function(){
  console.log("Server 3000 is running.");
});
