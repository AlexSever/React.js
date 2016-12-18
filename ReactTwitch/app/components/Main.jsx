import React from 'react';

import Channels from './Channels.jsx';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <div className="titleDiv">
                    <h1 className="title">Reactive Twitch</h1>
                </div>
                <Channels />
            </div>
        );
    }
}