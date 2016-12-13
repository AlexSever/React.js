import React from 'react';

import Streams from './Streams.jsx';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <div className="titleDiv">
                    <h1 className="title">Reactive Twitch</h1>
                </div>
                <Streams />
            </div>
        );
    }
}