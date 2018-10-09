var express = require('express');
var port = process.env.PORT || 3000

var fs = require('fs');
var showdown = require('showdown');
var converter = new showdown.Converter();

var app = express();

app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
    app.get('/', function (req, res) {
        fs.readFile(__dirname + '/README.md', 'utf-8', function(err, data) {
            if (err) throw err;
            res.send(converter.makeHtml(data));
        });
    })
});