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

## Performance and scalability

