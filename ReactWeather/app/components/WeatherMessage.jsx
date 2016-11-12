var React = require("react");

var WeatherMessage = React.createClass({
    render: function () {
        var location = this.props.location;
        var temp = this.props.temp;
        // var {temp, location} = this.props;
        return (
            <div>
                <h3 className="text-center">It's {temp}&deg;F in {location}.</h3>
            </div>
        );
    }
});

// var WeatherMessage = ({temp, location}) => {
//     return (
//         <h3>It's it {temp} in {location}.</h3>
//     )
// };

module.exports = WeatherMessage;