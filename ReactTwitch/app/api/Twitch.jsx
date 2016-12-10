import axios from 'axios';

const client_id = "client_id=ppjulqz1cnlk0oo7w3f3tqfkndc1gkh";
const TWITCH_URL = 'https://api.twitch.tv/kraken';
// const TWITCH_URL_CHANNELS = `${TWITCH_URL}/channels/${channel}?${client_id}`;
    // {params:{client_id: "ppjulqz1cnlk0oo7w3f3tqfkndc1gkh"}};

export default {
    getChannels(channel) {
        const TWITCH_URL_CHANNELS = `${TWITCH_URL}/channels/${channel}?${client_id}`;
        const TWITCH_URL_USERS = `${TWITCH_URL}/users/${channel}?${client_id}`;
        const TWITCH_URL_STREAMS = `${TWITCH_URL}/streams/${channel}?${client_id}`;

        return axios.all([
            axios.get(TWITCH_URL_CHANNELS),
            axios.get(TWITCH_URL_USERS),
            axios.get(TWITCH_URL_STREAMS)
        ])
        .then(axios.spread((channelsResponse, usersResponse, streamsResponse) => {
            return {
                channelData: channelsResponse.data,
                userData: usersResponse.data,
                streamData: streamsResponse.data
            };
        }))
        .catch(error => {
            console.log(error);
        });
        
        
        // return axios.get(TWITCH_URL_CHANNELS)
        //     .then(function (res) {
        //         let channelsResponse = res;
        //
        //         return axios.get(TWITCH_URL_STREAMS)
        //             .then(function (res) {
        //                 return {
        //                     channelData: channelsResponse.data,
        //                     streamData: res.data
        //                 };
        //             }, function (err) {
        //                 console.log(err);
        //             });
        //
        //     }, function (err) {
        //         console.log(err);
        //         // throw new Error(res.data.message);
        //     });
    }
};