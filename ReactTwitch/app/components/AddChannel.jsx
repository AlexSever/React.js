import React from 'react';

export default class AddChannel extends React.Component {
    render() {
        return (
            <div style={this.props.style} className='submit-popup'>
                <input
                    type='text'
                    placeholder='Channel Name'
                    className="add-channel-input"
                    ref="userInput"
                    /*value={this.state.input}*/
                    /*onChange={this.handleInputChange}*/
                    onKeyDown={this.props.onEnter}
                />
                <i className='fa fa-close' onClick={this.props.onClose}/>
                <button className="add-channel-button" onClick={this.props.onInput}>Add Channel</button>
                <p className='add-status'>{this.props.inputStatus}</p>
            </div>
        );
    }
}