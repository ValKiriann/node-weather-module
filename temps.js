const fetch = require("node-fetch");
const dotenv = require('dotenv').config()

var temps = {
    getTemp: async (city) => {
        try{
            var url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.APIKEY}&units=metric&q=${city}`
            let response = await fetch(url)
            let data = await response.json();
            if(data.cod == 200) {
                console.log(url)
                console.log(`returning ${city} temp: ${data.main.temp}`)
                return data.main.temp
            }else if(data.cod == '404'){
                console.log('bad city spelling ', city)
                console.log(url)
                console.log(data)
            }else {
                console.log(url)
                console.log(data)
            }
        } catch(error) {
            console.log('error ', error)
        }

        
    }
}

module.exports = temps