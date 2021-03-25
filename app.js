const express = require("express");
const { get } = require("http");
const https =require("https"); 
const { url } = require("inspector");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({entended: true}));
// What should happen when user tries to go to homepage, the root route
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req,res){
    const apiKey = "ac254995f1530b05133bdf3b89d170a4";
    const city = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = (Math.round(weatherData.main.temp));
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>The temperature in ${city} ${temp} degrees Celcius with ${description}</h1>`);
            res.write("<img src=" +imgUrl +">");
            res.send()

        })
    })
})


app.listen(3000, function(){
    console.log("server is running on port 3000");
})