import React from 'react';

import twitch from '../api/Twitch.jsx';

export default class Streams extends React.Component {
    constructor() {
        super();

        this.state = {
            fullData: []
        }
    }
    componentDidMount(){
        twitch.getChannels("ESL_SC2")
            .then(response => {
                console.log(response.fullData);
                this.setState({
                    fullData:response.fullData
                });
            // })
            // .then(response => {
            //     this.setState({classrooms: response.data.profile})
            })
            .catch((error) => {
                console.log("error",error)
            })
    }
    render() {
        console.log(this.state.fullData.display_name);
        return (
            <div>
                <h1>Hello! {this.state.fullData.display_name}</h1>
            </div>
        );
    }
}