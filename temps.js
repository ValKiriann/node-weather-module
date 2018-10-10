const fetch = require("node-fetch");
const dotenv = require('dotenv').config()

var temps = {
    getTemp: async (city) => {
        try{
            var url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.APIKEY}&units=metric&q=${city}`
            let response = await fetch(url)
            let data = await response.json();
            if(data.cod == 200) {
                return data.main.temp
            }else if(data.cod == '404'){
                var error = {type:"Invalid city", message:"City name is invalid or does not exist."}
                return temps.responseHandler(422,null,error)
            }else {
                var error = {type:"Server error", message:`Server error: ${data.message}`}
                return temps.responseHandler(500,null,error)
            }
        } catch(error) {
            //console.log('getTemp catch error ', error)
            var errorLog = {type:"Server error", message:`Server error: ${error}`}
            return temps.responseHandler(500,null,errorLog)
        }
    },
    compareTemps: async (city1,city2) => {
        try{
            var tempCity1 = await temps.getTemp(city1)
            console.log('compruebo city1')
            if(typeof tempCity1 == 'object'){
                
                return tempCity1
            }
            var tempCity2 = await temps.getTemp(city2)
            console.log('compruebo city2')
            if(typeof tempCity2 == 'object'){
                return tempCity2
            }
            var tempDiff = tempCity1 - tempCity2
            console.log("comparo las temp")
            if(tempDiff > 0) {
                var result = {
                    warmerCityName: city1,
                    colderCityName: city2,
                    difference: tempDiff
                }
                return temps.responseHandler(200,result)
            }else {
                tempDiff = Math.abs(tempDiff)
                var result = {
                    warmerCityName: city2,
                    colderCityName: city1,
                    difference: tempDiff
                }
                return temps.responseHandler(200,result)
            }

        } catch(error) {
            //console.log('compaTemp catch error ', error)
            var errorLog = {type:"Server error", message:`Server error: ${error}`}
            return temps.responseHandler(500,null,errorLog)
        }
    },
    responseHandler: function(statuscode, result, errors){
        let jsonResult = { httpStatusCode: statuscode}
        if(result){jsonResult.result = result}
        if(errors){jsonResult.errors = errors}
        console.log('jsonResult ', jsonResult)
        return jsonResult
    }
}

module.exports = temps