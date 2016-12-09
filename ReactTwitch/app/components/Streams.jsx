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
        this.findOnline = this.findOnline.bind(this);
        this.findOffline = this.findOffline.bind(this);
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
                // console.log(responses);
                let channels = [];
                responses.forEach(response => channels.push(response));
                let dataCopy = channels.slice();
                this.setState({
                    permanentData: dataCopy,
                    data: channels
                });
            });
    }
    findOnline() {
        let currentData = this.state.permanentData.slice();
        let online = currentData.filter(channel => {
            return channel.streamData.stream !== null;
        });
        this.setState({
            data: online
        }, function() {console.log(this.state.data);});
    }
    findOffline() {
        let currentData = this.state.permanentData.slice();
        let offline = currentData.filter(channel => {
            return channel.streamData.stream === null;
        });
        this.setState({
            data: offline
        }, function() {console.log(this.state.data);});
    }
    showAll() {
        let originalData = this.state.permanentData.slice();
        this.setState({
            data: originalData
        }, function() {console.log(this.state.data);});
    }
    render() {
        //console.log(JSON.stringify(this.state, null, 2));

        // let channels = this.state.data.map((item, index) => {
        //     return ( <h2 key={index}>{item.channelData.display_name} is {JSON.stringify(item.streamData.stream, null, 2)}</h2> );
        // });

        return (
            <div>
                <div className = "titleDiv">
                    <p className = "title">Twitch TV API Tool</p>
                </div>
                <div className = "btnDiv">
                    <button className = "onlineBtn" onClick = {this.findOnline}>Online</button>
                    <button className = "offlineBtn" onClick = {this.findOffline}>Offline</button>
                    <button className = "allBtn" onClick = {this.showAll}>Show All</button>
                </div>
                <RenderStreams data = {this.state.data} />
            </div>
        );
    }
}
class RenderStreams extends React.Component {
    // handleClick(link) {
    //     window.open(link);
    // }
    render() {
        let channels = this.props.data;
        let renderChannels = "";

        if (channels.length === 0) {
            return(<div className="spinner-loader">Loading…</div>);
        } else {
            renderChannels = channels.map((item, index) => {

                return ( <h2 key={index}>{item.channelData.display_name} is {JSON.stringify(item.streamData.stream, null, 2)}</h2> );

            });
        }

        return (
            <div>
                {renderChannels}
            </div>
        );
    }
}

// if(!this.state.items.length){
//     return(<div class="spinner-loader">Loading…</div>);
// }