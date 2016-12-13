import React from 'react';

import twitch from '../api/Twitch.jsx';

export default class Streams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            twitch: ["freecodecamp", "OgamingSC2", "trumpsc", "ESL_SC2", "cretetion", "storbeck", "RobotCaleb", "habathcx", "noobs2ninjas", "streamerhouse", "StonedYooda", "reynad27", "desertodtv", "plusan", "a_seagull"],
            permanentData: [],
            data: [],
            all: "active",
            online: "",
            offline: "",
            opacity: {opacity: "1"},
            popup: {
                visibility: "hidden",
                opacity: "0"
            },
            input: ""
        };
        this.findOnline = this.findOnline.bind(this);
        this.findOffline = this.findOffline.bind(this);
        this.showAll = this.showAll.bind(this);
        this.popupOpen = this.popupOpen.bind(this);
        this.popupClose = this.popupClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addChannel = this.addChannel.bind(this);
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
            data: online,
            all: "",
            online: "active",
            offline: ""
        }, function() {console.log(this.state.data);});
    }
    findOffline() {
        let currentData = this.state.permanentData.slice();
        let offline = currentData.filter(channel => {
            return channel.streamData.stream === null;
        });
        this.setState({
            data: offline,
            all: "",
            online: "",
            offline: "active"
        }, function() {console.log(this.state.data);});
    }
    showAll() {
        let originalData = this.state.permanentData.slice();
        this.setState({
            data: originalData,
            all: "active",
            online: "",
            offline: ""
        }, function() {console.log(this.state.data);});
    }
    popupOpen() {
        this.setState({
            opacity: {opacity: "0.3"},
            popup: {
                visibility: "visible",
                opacity: "1"
            }
        });
    }
    popupClose() {
        this.setState({
            input: "",
            opacity: {opacity: "1"},
            popup: {
                visibility: "hidden",
                opacity: "0"
            }
        });
    }
    handleInputChange(e) {
        this.setState({ input: e.target.value });
    }
    handleKeyDown(e) {
        if (e.keyCode == 13 ) {
            return this.addChannel();
        }
    }
    addChannel() {
        console.log(this.refs.userInput.value);
        console.log(this.state.input);
        // var val = this.refs.channel.value;
        // console.log(val);
    }
    render() {
        //console.log(JSON.stringify(this.state, null, 2));

        // let channels = this.state.data.map((item, index) => {
        //     return ( <h2 key={index}>{item.channelData.display_name} is {JSON.stringify(item.streamData.stream, null, 2)}</h2> );
        // });

        let styleOnlineBtn = {background: "transparent"},
            styleOfflineBtn = {background: "transparent"};

        if (this.state.online === "active") {
            styleOnlineBtn = {background: "#00E676"}
        }
        if (this.state.offline === "active") {
            styleOfflineBtn = {background: "#FF1744"}
        }
        let allBtn = `left-nav-button ${this.state.all}`,
            onlineBtn = `left-nav-button ${this.state.online}`,
            offlineBtn = `left-nav-button ${this.state.offline}`;

        return (
            <div>
                <div className="left-nav">
                    <button className={allBtn} onClick={this.showAll}>All</button>
                    <button style={styleOnlineBtn} className={onlineBtn} onClick={this.findOnline}>Online</button>
                    <button style={styleOfflineBtn} className={offlineBtn} onClick={this.findOffline}>Offline</button>
                    <button className="addChannelBtn" onClick={this.popupOpen}>Add Channel</button>
                    <a href='http://www.twitch.tv' target='_blank'><i className='fa fa-twitch'/></a>
                </div>
                <div style={this.state.opacity} className="right-field">
                    <HandleStreams data={this.state.data} onLoad={this.handleLoaded} />
                </div>
                <div style={this.state.popup} className='submit-popup'>
                    <input className="add-channel-input" type='text' value={this.state.input} ref="userInput" onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} placeholder='Channel Name'></input>
                    <i className='fa fa-close' onClick={this.popupClose}/>
                    <button className="add-channel-button" type="submit" onClick={this.addChannel}>Add Channel</button>
                    <p id='add-status'></p>
                </div>
            </div>
        );
    }
}
class HandleStreams extends React.Component {
    render() {
        let channels = this.props.data;
        let renderChannels = "";

        if (channels.length === 0) {
            // return(<div className="spinner-loader">Loading…</div>);
            return (<img className="spinner-loader" src="spin.svg" alt="spinner-loader"/>);
        } else {
            renderChannels = channels.map(item => {

                let url = item.channelData.url,
                    id = item.channelData._id,
                    name = item.channelData.display_name,
                    logo = item.channelData.logo,
                    streaming = item.streamData.stream,
                    streamingMessage = "",
                    bio = item.userData.bio,
                    closed = "",
                    style = {background: "#FF1744"};

                if ( (streaming === null) || (streaming === undefined) ) {
                    streamingMessage = "User is not currently streaming";
                } else {
                    streamingMessage = `User is currently streaming ${streaming.game} with ${streaming.viewers} viewers.`;
                    style = {background: "#00E676"}
                }

                if (item.channelData.status === 422) {
                    closed = "This account is closed or does not exist";
                    streamingMessage = "";
                    style = {background: "#000000"}
                }

                if (logo === null) {
                    logo = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/TwitchHolder.png';
                }

                return (
                    <RenderStream
                        key = {id}
                        url = {url}
                        logo = {logo}
                        name = {name}
                        streaming = {streaming}
                        streamingMessage = {streamingMessage}
                        bio = {bio}
                        closed = {closed}
                        style = {style}
                    />
                );
            });
        }

        return (
            <div>
                {renderChannels}
            </div>
        );
    }
}

class RenderStream extends React.Component {
    handleClick(link) {
        window.open(link);
    }
    render() {
        return (
            <div className="stream" onClick={this.handleClick.bind(null, this.props.url)} >
                <div className="frontSide">
                    <img className="logo" src={this.props.logo} alt="player logo" />
                    <p className="channelName">{this.props.name}</p>
                    <div style={this.props.style} className="status"></div>
                </div>
                <div className="overlay">
                    <p className="bio">{this.props.bio}</p>
                </div>
            </div>
        );
    }
}

// <p>{this.props.closed}</p>
// <p className="streaming">{this.props.streamingMessage}</p>
