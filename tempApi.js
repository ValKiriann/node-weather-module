const fetch = require("node-fetch");
const dotenv = require('dotenv').config()
const toolbox = require('./toolbox')

let tempApi = {
    getTemp: async (city) => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.APIKEY}&units=metric&q=${city}`
            let response = await fetch(url)
            let data = await response.json();
            if(data.cod == 200) {
                return data.main.temp
            }else if(data.cod == '404'){
                let error = {type:"Invalid city", message:"City name is invalid or does not exist."}
                return toolbox.responseHandler(422,null,error)
            }else {
                let error = {type:"Server error", message:`Server error: ${data.message}`}
                return toolbox.responseHandler(500,null,error)
            }
        } catch(error) {
            let errorLog = {type:"Server error", message:`Server error: ${error}`}
            return toolbox.responseHandler(500,null,errorLog)
        }
    }
}

module.exports = tempApi