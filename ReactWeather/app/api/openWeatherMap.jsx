var axios = require('axios');

// Open Weather Map has a feature which is a double-edged sword:
// It will try to interpret whatever was passed as a valid location, so
// 'asdfgh' will become Dispur, the capital of Assam state.
// This was confusing when trying to test the error-handling, to say the least!
// The place name that it is returning data for is now passed back to show when
// it is doing clever substitution. This has another advantage, because it
// capitalises the location correctly, e.g. San Francisco or Dar es Salaam.

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=117c340fc4778022500051af8b65c7d4&units=imperial';

module.exports = {
    getTemp: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

        // Problem in AXIOS
        return axios.get(requestUrl).then(function (res) {
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return {
                    location: res.data.name,     // May not match what was typed
                    temp:     res.data.main.temp // Temperature
                };
            }
        }, function (res) {
            throw new Error(res.data.message);
            // throw new Error("City not found");
        });
    }
};

// 117c340fc4778022500051af8b65c7d4

/*
// JQuery option

var OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/weather";

module.exports = {
    getTemp: function (location) {
        var encodedLocation = encodeURIComponent(location);

        var requestUrl = OPEN_WEATHER_MAP_URL + '?' + $.param({
                'q': encodedLocation, 
                'units': "imperial", 
                'appid': "117c340fc4778022500051af8b65c7d4"
        });

        return $.getJSON(requestUrl).then(function (res) {
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return {
                    location: res.data.name,     // May not match what was typed
                    temp:     res.data.main.temp // Temperature
                };
            }
        }, function (res) {
            throw new Error(res.data.message);
        });
    }
};
*/