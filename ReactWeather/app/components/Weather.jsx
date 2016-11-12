var React = require("react");

var WeatherForm = require("WeatherForm");
var WeatherMessage = require("WeatherMessage");
var ErrorModal = require("ErrorModal");
var openWeatherMap = require("openWeatherMap");

var Weather = React.createClass({
    getInitialState: function () {
        return {
            location:  '',
            forecast:  '',
            isLoading: false,
            errorMessage: undefined
        };
    },
    componentDidMount: function () {
        var location = this.props.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = "#/";
        }
    },
    componentWillReceiveProps: function (newProps) {
        var location = newProps.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = "#/";
        }
    },
    render: function () {
        // var location = this.state.location;
        // var temp = this.state.temp;
        // var isLoading = this.state.isLoading;
        var {isLoading, temp, location, errorMessage} = this.state;

        function renderMessage () {
            if (isLoading) {
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if (temp && location) {
                return <WeatherMessage temp={temp} location={location}/>;
            }
        }
        
        function renderError() {
            if  (typeof errorMessage === "string") {
                return <ErrorModal message={errorMessage}/>;
            }
        }
        
        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        )
    },
    handleSearch: function (location) {
        var self = this; // If I left "this", it will point to another openWeatherMap object
        this.setState({
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined
        });

        openWeatherMap.getTemp(location).then(function (data) {
            self.setState({
                location:  data.location,
                temp:      data.temp,
                isLoading: false
            });
        }, function (e) {
            self.setState({
                isLoading: false,
                errorMessage: e.message
            });
        });
    }
});

module.exports = Weather;