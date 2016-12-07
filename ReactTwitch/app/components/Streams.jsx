import React from 'react';

import twitch from '../api/Twitch.jsx';

export default class Streams extends React.Component {
    constructor() {
        super();

        this.state = {
            twitch: ["freecodecamp", "OgamingSC2", "trumpsc", "ESL_SC2", "cretetion", "storbeck", "RobotCaleb", "habathcx", "noobs2ninjas", "streamerhouse", "StonedYooda", "reynad27", "desertodtv", "plusan", "a_seagull"],
            fullData: []
        }
    }
    componentDidMount() {
        var channels = this.state.twitch;
        let promises = channels.map(channel => {
            return new Promise ((resolve, reject) => {
                twitch.getChannels(channel)
                    .then(response => {
                        resolve(response);

                        //console.log("currentData");
                        //console.log(currentData);

                        //console.log(this.state.fullData[0].display_name);
                        // })
                        // .then(response => {
                        //     this.setState({classrooms: response.data.profile})
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        });
        Promise.all(promises)
            .then(responses => {
            console.log("any text");
            console.log(responses);
            var channels = [];
            responses.forEach(response => channels.push(response));
            this.setState({
                fullData:channels
            });
            console.log(this.state.fullData);
        });

    }
    render() {
        //console.log(JSON.stringify(this.state, null, 2));

        // var user = this.state.fullData[0].display_name;
        // console.log(user);

        let channels = this.state.fullData.map((item, index) => {
            return ( <h2 key={index}>{item.channelData.display_name} is {JSON.stringify(item.streamData.stream, null, 2)}</h2> );
        });

        return (
            <div>
                <h1>Hello</h1>
                {channels}
            </div>
        );
    }
}