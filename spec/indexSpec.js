'use strict';

const weatherData = require('../public/js/index');
var fs = require('fs');
let cheerio = require('cheerio'); //JQuery that can be used in testing and on the server side
cheerio.load(fs.readFileSync('spec/tester.html'));
var request = require("request");

describe('Weather App', function() {

    var zipcode = "19406"; //King of Prussia, PA Zipcode
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us?&APPID=adc300253fbea280c69d08b0cf7d1ad5";

    // This tests if showWeather function has been called
    it('get weather data', function() {
        
        spyOn(weatherData, 'showWeather');
        weatherData.getWeatherData(zipcode);

        expect(weatherData.showWeather.callCount).toEqual(1);
        expect(weatherData.showWeather).toHaveBeenCalled();
    });

    // This tests if the status code is 200
    it("returns status code 200", function() {
        request.get(weatherURL, function() {
            expect(response.statusCode).toBe(200);
        });
    });
    
});