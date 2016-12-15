import React from 'react';

import TwitchAPI from '../api/Twitch.jsx';

// import AddStream from './AddStream.jsx';

export default class Streams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            twitchChannelsDB: ["freecodecamp", "ogamingsc2", "trumpsc", "esl_sc2", "cretetion", "storbeck", "robotcaleb", "habathcx", "noobs2ninjas", "streamerhouse", "stonedyooda", "reynad27", "desertodtv", "plusan", "a_seagull"],
            permanentData: [],
            renderingData: [],
            all: "active",
            online: "",
            offline: "",
            opacity: {opacity: "1"},
            popup: {
                visibility: "hidden",
                opacity: "0"
            },
            inputStatus: ""
            //input: ""
        };
        this.findOnline = this.findOnline.bind(this);
        this.findOffline = this.findOffline.bind(this);
        this.showAll = this.showAll.bind(this);
        this.popupOpen = this.popupOpen.bind(this);
        this.popupClose = this.popupClose.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.removeChannel = this.removeChannel.bind(this);
    }
    componentDidMount() {
        this.loadChannelsFromDB();
    }
    loadChannelsFromDB() {
        let channels = this.state.twitchChannelsDB;
        let promises = channels.map(channel => {
            return new Promise ((resolve, reject) => {
                TwitchAPI.getChannelData(channel)
                    .then(response => {
                        resolve(response);
                    }, error => {
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
                    renderingData: channels
                });
            });
    }
    findOnline() {
        let currentData = this.state.permanentData.slice();
        let online = currentData.filter(channel => {
            return channel.streamData.stream !== null;
        });
        this.setState({
            renderingData: online,
            all: "",
            online: "active",
            offline: ""
        }, function() {console.log(this.state.renderingData);});
    }
    findOffline() {
        let currentData = this.state.permanentData.slice();
        let offline = currentData.filter(channel => {
            return channel.streamData.stream === null;
        });
        this.setState({
            renderingData: offline,
            all: "",
            online: "",
            offline: "active"
        }, function() {console.log(this.state.renderingData);});
    }
    showAll() {
        let originalData = this.state.permanentData.slice();
        this.setState({
            renderingData: originalData,
            all: "active",
            online: "",
            offline: ""
        }, function() {console.log(this.state.renderingData);});
    }
    popupOpen() {
        //this.refs.userInput.focus();
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
            // input: "",
            opacity: {opacity: "1"},
            popup: {
                visibility: "hidden",
                opacity: "0"
            },
            inputStatus: ""
        });
        this.refs.userInput.value = "";
    }
    // handleInputChange(e) {
    //     this.setState({ input: e.target.value });
    // }
    handleKeyDown(e) {
        if (e.keyCode == 13 ) {
            return this.addChannel();
        }
    }
    addChannel() {
        let userInput = this.refs.userInput.value.toLowerCase();
        //console.log(this.state.input);
        if (userInput.length > 0) {
            if (this.state.twitchChannelsDB.indexOf(userInput) !== -1) {
                this.setState({
                    inputStatus: `${userInput} is already in the list.`
                });
            } else {
                TwitchAPI.getChannelData(userInput)
                    .then(response => {
                        console.log(response);
                        let channels = this.state.twitchChannelsDB.slice();
                        channels.push(userInput);

                        let permanentData = this.state.permanentData.slice();
                        permanentData.push(response);

                        let currentData = this.state.renderingData.slice();
                        currentData.push(response);

                        if
                            (this.state.online === "active" && response.streamData.stream === null) {
                        } else if
                            (this.state.offline === "active" && response.streamData.stream !== null) {
                        } else {
                            this.setState({
                                renderingData: currentData
                            });
                        }

                        this.setState({
                            twitchChannelsDB: channels,
                            permanentData: permanentData,
                            inputStatus: `${userInput} channel added successfully!`
                        });
                    }, error => {
                        console.log(error);
                        this.setState({
                            inputStatus: `Could not find channel ${userInput}.`
                        });
                    });

            }
        }
    }
    removeChannel(name, id) {
        let channels = this.state.twitchChannelsDB.slice();
        let channel = name.toLowerCase();
        let index = channels.indexOf(channel);
        channels.splice(index, 1);

        let permanentData = this.state.permanentData.slice();
        let permanentDataLeft = permanentData.filter(channel => {
            return channel.channelData._id !== id;
        });

        let currentData = this.state.renderingData.slice();
        let currentDataLeft = currentData.filter(channel => {
            return channel.channelData._id !== id;
        });

        this.setState({
            twitchChannelsDB: channels,
            permanentData: permanentDataLeft,
            renderingData: currentDataLeft
        }/*, function() {this.loadChannelsFromDB();}*/);
    }
    render() {
        //console.log(JSON.stringify(this.state, null, 2));

        // let channels = this.state.renderingData.map((item, index) => {
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
                    <HandleStreams data={this.state.renderingData} removeChannel={this.removeChannel}/>
                </div>
                <div style={this.state.popup} className='submit-popup'>
                    <input
                        type='text'
                        placeholder='Channel Name'
                        className="add-channel-input"
                        ref="userInput"
                        /*value={this.state.input}*/
                        /*onChange={this.handleInputChange}*/
                        onKeyDown={this.handleKeyDown}
                    />
                    <i className='fa fa-close' onClick={this.popupClose}/>
                    <button className="add-channel-button" onClick={this.addChannel}>Add Channel</button>
                    <p className='add-status'>{this.state.inputStatus}</p>
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
                        removeChannel = {this.props.removeChannel}
                        id = {id}
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
            <div className="stream" >
                <div className="frontSide">
                    <img className="logo" src={this.props.logo} alt="player logo" />
                    <p className="channelName" >{this.props.name}</p>
                    <div style={this.props.style} className="status"></div>
                </div>
                <div className="overlay">
                    <i className='fa fa-close' onClick={this.props.removeChannel.bind(null, this.props.name, this.props.id)}/>
                    <p className="bio" onClick={this.handleClick.bind(null, this.props.url)} >{this.props.bio}</p>
                </div>
            </div>
        );
    }
}

// <p>{this.props.closed}</p>
// <p className="streaming">{this.props.streamingMessage}</p>
