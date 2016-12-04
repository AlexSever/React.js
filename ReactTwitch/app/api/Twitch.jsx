import axios from 'axios';

const client_id = "client_id=ppjulqz1cnlk0oo7w3f3tqfkndc1gkh";
const TWITCH_URL = 'https://api.twitch.tv/kraken/';
// const TWITCH_URL_CHANNELS = `${TWITCH_URL}/channels/${channel}?${client_id}`;
    // {params:{client_id: "ppjulqz1cnlk0oo7w3f3tqfkndc1gkh"}};
// const TWITCH_URL_STREAMS = `${TWITCH_URL}/streams/${channel}?${client_id}`;

let channels = ["freecodecamp", "OgamingSC2", "trumpsc", "ESL_SC2", "cretetion", "storbeck", "RobotCaleb", "habathcx", "noobs2ninjas", "streamerhouse", "StonedYooda", "reynad27", "desertodtv", "plusan", "a_seagull"];

export default {
    getChannels(channel) {
        // var encodedLocation = encodeURIComponent(location);
        let requestUrl = `${TWITCH_URL}/channels/${channel}?${client_id}`;

        return axios.get(requestUrl)
            .then(function (res) {
                console.log(res.data);
                return {
                    fullData: res.data
                };
            }, function (error) {
                console.log(error);
                // throw new Error(res.data.message);
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