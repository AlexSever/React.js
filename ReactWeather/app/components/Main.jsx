var React = require("react");
var Nav = require("Nav");

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <Nav/>
                <div className="row">
                    <div className="columns medium-6 large-4 small-centered">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

// var Main = (props) => {
//     return (
//         <div>
//             <Nav/>
//             <h2>Main Component</h2>
//             {this.props.children}
//         </div>
//     );
// };

module.exports = Main;