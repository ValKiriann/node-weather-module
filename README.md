# node-weather-module

a quick node practice in which I try the open weather map api to create a module for comparing temperatures between two cities

## The challenge

This project was a challenge with special rules to complete it:

- Use Nodejs + Express library
- Turn on the server in localhost using node commands
- The temperature has to be displayed in Celsius
- Use [Open Weather Map api](https://openweathermap.org/appid#get) as the data source

## Getting Started

### Prerequisites

To run everything perfectly you first need to install all the dependencies

```
npm install
```

Because in the exercise we are using the [Open Weather Map]() api, you need to have an apikey, which is not provided in the repository for safety reasons, when you have yours, you just have to create a file in the root of the repositorie called -env and insert the key

```
APIKEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

The dotenv library is already included and the .env file is the only thing that you would need to add to start the server

It is probably that you may need to specify the port that you want to use, I had set it uo to your process environment port or, in case that you dont have one specified, the port 3000. You can change it in the code if you need to.

### Start the server

To run the server simply use

```
npm start
```
### Comparing the weather

You can easily compare the temperature between two cities by going to /compareWeather and passing the values of the two cities:

```
compareWeather/?city1=madrid&city2=london
```
There is a special entry to compare cities with madrid at compareWeather/madrid. Note that you only have to introduce te value of one city to compare it with Madrid

```
compareWeather/madrid?city=london
```

In any of the two cases, if the cities are valid it would return a json with the response:

```
{
  "httpStatusCode": 200,
  "result": {
    "warmerCityName": "london",
    "colderCityName": "madrid",
    "difference": 0.89
  }
}
```

## Performance and scalability

The app is divided in 3 files. 
 - Server.js has the server logic. 
 - tempApi.js has the api logic part. 
 - toolbox.js has the functions that we need to perfom operations, it has the compareTemps and the response handler.   
   
The response handler is not divided into another file because at this time of the project is it very small but if the project gets bigger the recommendation is to give him his own space in another module.  
  
By separating the api logic from the tools or the server we can make the app more scalable. We could change the api that we use to get the data and if the return value is still a number the rest of the logic will continue to work good.  
  
The app follows the Single Responsibility Principle

## Timing
<p align="center">
    <img src="http://swipeapp.890m.com/wp-content/uploads/2017/08/IMG_0479.png" alt="wakatime logo" title="wakatime logo" align="left" height="100" />
</p>
I used Wakatime to register my timing in the project and It was 4h and 38m.
