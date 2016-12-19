import React from 'react';

import RenderChannel from './RenderChannel.jsx';

export default class LoadChannels extends React.Component {
    render() {
        let channels = this.props.data;
        let loadChannels = "";
        if (this.props.isLoading) {
            // return(<div className="spinner-loader">Loading…</div>);
            return (<img className="spinner-loader" src="spin.svg" alt="spinner-loader"/>);
        } else {
            loadChannels = channels.map(item => {

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
                    <RenderChannel
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
                {loadChannels}
            </div>
        );
    }
}