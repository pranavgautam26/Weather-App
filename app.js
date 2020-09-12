const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");


});


app.post("/",function(req, res){
  const query = req.body.cityName;



  const city = query;
  const apiKey = "";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      console.log(temp);
      console.log(description);
      res.write("<p>The Weather is currently "+description+" in "+ query +"<p>");
      res.write("<h1>The Temp in "+query+" is "+temp+" degree Celcius.</h1>");
      res.write("<img src="+ imageUrl+ ">");

      res.send();
    });

  });
});





app.listen(3000, function(){
  console.log("server is running on port 3000.");
});
