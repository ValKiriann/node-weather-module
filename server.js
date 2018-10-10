var express = require('express');
var port = process.env.PORT || 3000

var fs = require('fs');
var showdown = require('showdown');
var converter = new showdown.Converter();

var temps = require("./temps")

var app = express();

app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
    app.get('/', function (req, res) {
        fs.readFile(__dirname + '/README.md', 'utf-8', function(err, data) {
            if (err) throw err;
            res.send(converter.makeHtml(data));
        });
    })
    app.get('/compareWeather/madrid', async (req, res, next) => {
        try {
            if(!req.query.city){
                res.status(423).send("Please, add a city compare with");
            }else {
                var city1Temp = await temps.getTemp('madrid')
                var city2Temp = await temps.getTemp(req.query.city)
                res.status(200).send(`The current temperature in Madrid is ${city1Temp} and in ${req.query.city} is ${city2Temp}`);
            }
        }
        catch(error) {
            console.log('catch error ', error)
        }
        
    })
    app.get('/compareWeather', async (req, res, next) => {
        try {
            if(!req.query.city1 || !req.query.city2){
                res.status(423).send("Please, make sure that you have added two cities to compare with");
            }else {
                var city1Temp = await temps.getTemp(req.query.city1)
                var city2Temp = await temps.getTemp(req.query.city2)
                res.status(200).send(`The current temperature in ${req.query.city1} is ${city1Temp} and in ${req.query.city2} is ${city2Temp}`);
            }
        }
        catch(error) {
            console.log('catch error ', error)
        }
    })
});