'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var $ = require('cheerio'); //JQuery that can be used on the server side

module.exports = {
    getWeatherData,
    showWeather
}

function getWeatherData(zipcode) {
    
    var openWeatherRequest = new XMLHttpRequest();
    var zipCodeRequest = new XMLHttpRequest();
    var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us?&APPID=adc300253fbea280c69d08b0cf7d1ad5";
    var zipCodeURL = "http://api.zippopotam.us/us/"+zipcode;
    var openWeatherResponse;
    var zipCodeResponse;

    if(isNaN(zipcode) || zipcode.length != 5) {
        alert("Please Enter a 5 digit Number");
        return false;
    }
    else {
        // Sending Web Request to OpenWeather
        openWeatherRequest.open("GET", openWeatherURL, false);
        openWeatherRequest.send();

        if (openWeatherRequest.status == 200) {
            openWeatherResponse = JSON.parse(openWeatherRequest.responseText);
        }
        
        // Sending Web Request to Accuweather
        zipCodeRequest.open("GET", zipCodeURL, false);
        zipCodeRequest.send();

        if (zipCodeRequest.status == 200) {
            zipCodeResponse = JSON.parse(zipCodeRequest.responseText);
        }
    }

    this.showWeather(openWeatherResponse, zipCodeResponse);
}

function showWeather(openWeatherResponse, zipCodeResponse) {
    var locationId = $('#location');
    var temperatureId = $('#temperature');
    var conditionId = $('#condition');
    var humidityId = $('#humidity');
    var windId = $('#wind');
    var weatherCard = $('#weatherCard');

    weatherCard.css("display", "block");

    //Converting temperature [Kelvin > Farenheit]
    var tempF = parseInt(1.8 * (openWeatherResponse.main.temp - 273) + 32);

    //Rendering neccessary data
    locationId.html(zipCodeResponse.places["0"]["place name"] + ", " + zipCodeResponse.places["0"]["state abbreviation"]);
    temperatureId.html(tempF + " F");
    conditionId.html("Condition: " + openWeatherResponse.weather["0"].main);
    humidityId.html("Humidity: " + openWeatherResponse.main.humidity + "%");
    windId.html("Wind: " + openWeatherResponse.wind.speed + "mph");

}