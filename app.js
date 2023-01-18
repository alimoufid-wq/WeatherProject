

var express = require('express');
var https = require('https');
var bodyParser = require("body-parser");



var app = express();

app.use(bodyParser.urlencoded({extended : true}));


app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function (req,res) {
    const query = req.body.CityName;
    const appId = "ecba5bd226604e0ee08bce3061e0e767"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ appId+"&units="+unit;
    https.get(url, function (response) {
        response.on("data",function (data) {
            const weatherData =  JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const id = weatherData.weather[0].icon;
            const imgUrl =  "http://openweathermap.org/img/wn/"+ id +"@2x.png";
            res.write("<h1> The weather is : " + description+ "</h1>");
            res.write("<h1>The Tempretaure in "+ query+ " is " + temp + '</h1>');
            res.write("<img src="+ imgUrl+">");
            res.send();
        })
    } )
})






app.listen(3000 ,function() {
    console.log("The server starts at port 3000");
})
