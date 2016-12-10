import React from 'react';

import Streams from './Streams.jsx';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <div className = "titleDiv">
                    <p className = "title">Twitch TV API Tool</p>
                </div>
                <Streams />
            </div>
        );
    }
}