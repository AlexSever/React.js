import React from 'react';

export default class RenderChannel extends React.Component {
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
                    <p className="bio" onClick={this.handleClick.bind(this, this.props.url)} >{this.props.bio}</p>
                </div>
            </div>
        );
    }
}
