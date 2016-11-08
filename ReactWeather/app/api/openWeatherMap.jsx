var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=117c340fc4778022500051af8b65c7d4&units=imperial';

module.exports = {
    getTemp: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl).then(function (res) {
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return res.data.main.temp;
                // return {
                //     location: response.data.name,     // May not match what was typed
                //     temp:     response.data.main.temp // Temperature
                // }
            }
        }, function (res) {
            throw new Error(res.data.message);
        });
    }
};

// 117c340fc4778022500051af8b65c7d4