import axios from 'axios';

const client_id = "client_id=ppjulqz1cnlk0oo7w3f3tqfkndc1gkh";
const TWITCH_URL = 'https://api.twitch.tv/kraken';
// const TWITCH_URL_CHANNELS = `${TWITCH_URL}/channels/${channel}?${client_id}`;
    // {params:{client_id: "ppjulqz1cnlk0oo7w3f3tqfkndc1gkh"}};
// const TWITCH_URL_STREAMS = `${TWITCH_URL}/streams/${channel}?${client_id}`;

export default {
    getChannels(channel) {
        // var encodedLocation = encodeURIComponent(location);
        const TWITCH_URL_CHANNELS = `${TWITCH_URL}/channels/${channel}?${client_id}`;
        const TWITCH_URL_STREAMS = `${TWITCH_URL}/streams/${channel}?${client_id}`;

        return axios.get(TWITCH_URL_CHANNELS)
            .then(function (res) {
                let channelsResponse = res;

                return axios.get(TWITCH_URL_STREAMS)
                    .then(function (res) {
                        return {
                            channelData: channelsResponse.data,
                            streamData: res.data
                        };
                    }, function (err) {
                        console.log(err);
                    });

            }, function (err) {
                console.log(err);
                // throw new Error(res.data.message);
            });
    }
};