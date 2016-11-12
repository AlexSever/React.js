var React = require("react");

var About = React.createClass({
    render: function () {
        return (
            <div>
                <h1 className="text-center page-title">About</h1>
                <p>This is a weather application build on React. I have built this for The Complete React Web App Developer Course.</p>
                <p>It gather's weather data for a given location from <a target="_blank" href="http://openweathermap.org">OpenWeatherMap</a>.</p>
                <p>If a misspelled location is entered, an attempt is made to interpret the desired location.</p>
                <p>Here are some of the tools I used:</p>
                <ul>
                    <li>
                        <a target="_blank" href="https://facebook.github.io/react">React</a> - This was the JavaScript framework used.
                    </li>
                    <li>
                        <a target="_blank" href="http://openweathermap.org">Open Weather Map</a> - I used Open Weather Map to search for weather data by city name.
                    </li>
                </ul>
            </div>
        );
    }
});

// var About = (props) => {
//     return (
//         <h3>About Component</h3>
//     )
// };

module.exports = About;