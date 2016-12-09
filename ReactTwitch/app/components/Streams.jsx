import React from 'react';

import twitch from '../api/Twitch.jsx';

export default class Streams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            twitch: ["freecodecamp", "OgamingSC2", "trumpsc", "ESL_SC2", "cretetion", "storbeck", "RobotCaleb", "habathcx", "noobs2ninjas", "streamerhouse", "StonedYooda", "reynad27", "desertodtv", "plusan", "a_seagull"],
            permanentData: [],
            data: []
        };
        this.findStreaming = this.findStreaming.bind(this);
        this.showAll = this.showAll.bind(this);
    }
    componentDidMount() {
        let channels = this.state.twitch;
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
                let channels = [];
                responses.forEach(response => channels.push(response));
                let dataCopy = channels.slice();
                this.setState({
                    permanentData: dataCopy,
                    data: channels
                });
                console.log(this.state.permanentData);
            });
    }
    findStreaming() {
        let currentData = this.state.permanentData.slice();
        let filtered = currentData.filter(channel => {
            return channel.streamData.stream !== null;
        });
        this.setState({
            data: filtered
        }, function() {console.log(this.state.data);});
    }
    showAll() {
        var originalData = this.state.permanentData.slice();
        this.setState({
            data: originalData
        }, function() {console.log(this.state.data);});
    }
    render() {
        //console.log(JSON.stringify(this.state, null, 2));

        let channels = this.state.data.map((item, index) => {
            return ( <h2 key={index}>{item.channelData.display_name} is {JSON.stringify(item.streamData.stream, null, 2)}</h2> );
        });

        return (
            <div>
                <button onClick = {this.findStreaming}>Show Streaming</button>
                <button onClick = {this.showAll}>Show All</button>
                <h1>Hello</h1>
                {channels}
            </div>
        );
    }
}

// if(!this.state.items.length){
//     return(<div class="spinner-loader">Loading…</div>);
// }