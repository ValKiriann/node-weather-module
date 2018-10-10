const tempApi = require("./tempApi")

let toolbox = {
    compareTemps: async (city1,city2) => {
        try{
            let tempCity1 = await tempApi.getTemp(city1)
            if(typeof tempCity1 == 'object'){
                return tempCity1
            }
            let tempCity2 = await tempApi.getTemp(city2)
            if(typeof tempCity2 == 'object'){
                return tempCity2
            }
            let tempDiff = tempCity1 - tempCity2
            if(tempDiff > 0) {
                let result = {
                    warmerCityName: city1,
                    colderCityName: city2,
                    difference: Math.round( tempDiff * 100 ) / 100
                }
                return toolbox.responseHandler(200,result)
            }else {
                tempDiff = Math.abs(tempDiff)
                let result = {
                    warmerCityName: city2,
                    colderCityName: city1,
                    difference: Math.round( tempDiff * 100 ) / 100
                }
                return toolbox.responseHandler(200,result)
            }

        } catch(error) {
            let errorLog = {type:"Server error", message:`Server error: ${error}`}
            return toolbox.responseHandler(500,null,errorLog)
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

module.exports = toolbox