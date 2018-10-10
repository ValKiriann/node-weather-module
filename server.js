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
                var errorLog = {type:"Server error", message:`Server error: Please enter a city to compare. Make sure that the query has city as parameter`}
                res.status(423).send(temps.responseHandler(423,null,errorLog));
            }else {
                var result = await temps.compareTemps("madrid",req.query.city)
                res.status(result.httpStatusCode).json(result);
            }
        }
        catch(error) {
            console.log('catch error ', error)
        }
        
    })
    app.get('/compareWeather', async (req, res, next) => {
        try {
            if(!req.query.city1 || !req.query.city2){
                var errorLog = {type:"Server error", message:`Server error: Please enter 2 cities to compare. Make sure that the query has city1 and city2 as parameters`}
                res.status(423).send(temps.responseHandler(423,null,errorLog));
            }else {
                var result = await temps.compareTemps(req.query.city1,req.query.city2)
                console.log(result)
                res.status(result.httpStatusCode).json(result);
            }
        }
        catch(error) {
            console.log('catch error ', error)
        }
    })
    app.get('*', function(req, res){
        var errorLog = {type:"Not Found", message:`Not found: Nothing to do here`}
        res.status(404).send(temps.responseHandler(404,null,errorLog));
    });
});