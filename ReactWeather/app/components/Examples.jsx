var React = require("react");
var {Link} = require("react-router");

var Examples = React.createClass({
    render: function () {
        return (
            <div>
                <h1 className="text-center page-title">Examples</h1>
                <p>Here are a few example locations to try out:</p>
                <ol>
                    <li>
                        <Link to="/?location=New York">New York, NY</Link>
                    </li>
                    <li>
                        <Link to="/?location=Moscow">Moscow, Russia</Link>
                    </li>
                </ol>
            </div>
        );
    }
});

// var Examples = (props) => {
//     return (
//         <h3>Examples Component</h3>
//     )
// };

module.exports = Examples;