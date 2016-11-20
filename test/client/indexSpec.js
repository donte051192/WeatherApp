'use strict';

const weatherData = require('/js/index');

describe('Weather App', function() {

    var zipcode = "19406"; //King of Prussia, PA Zipcode

    // This tests both functions
    it('get weather data', function() {

        spyOn(weatherData, 'showWeather');
        weatherData.getWeatherData(zipcode);

        expect(openWeatherRequest.status).toEqual(200);
        expect(weatherData.showWeather).toHaveBeenCalled();
    })
})