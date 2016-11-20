var Comment = React.createClass({
    getInitialState: function () {
        return {editing: false};
    },
    edit: function () {
        this.setState({editing: true});
    },
    remove: function () {
        console.log("Removing comment");
        this.props.deleteFromBoard(this.props.index);
    },
    save: function () {
        var val = this.refs.newText.value;
        this.props.updateCommentText(val, this.props.index);
        this.setState({editing: false});
    },
    renderNormal: function () {
        return (
            <div className="thumbnail">
                <div className="commentText">{this.props.children}</div>
                <button onClick={this.edit} className="btn btn-warning btn-sm">Edit</button>
                <button onClick={this.remove} className="btn btn-danger btn-sm">Remove</button>
            </div>
        );
    },
    renderForm: function () {
        return (
            <div className="thumbnail">
                <div>
                    <textarea ref="newText" defaultValue={this.props.children}></textarea>
                </div>
                <button onClick={this.save} className="btn btn-success btn-sm">Save</button>
            </div>
        );
    },
    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
});

var Board = React.createClass({
    getInitialState: function () {
        return {
            comments: []
        };
    },
    add: function (text) {
        var arr = this.state.comments;
        arr.push(text);
        this.setState({comments: arr});
    },
    removeComment: function (i) {
        var arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({comments: arr});
    },
    updateComment: function (newText, i) {
        var arr = this.state.comments;
        arr[i] = newText;
        this.setState({comments: arr});
    },
    eachComment: function (text, i) {
        return (
            <Comment key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>
            {text}
            </Comment>
        );
    },
    render: function () {
        return (
            <div>
                <button onClick={this.add.bind(null, "Default Text")} className="btn btn-primary btn-sm">Add New</button>
                <div className="well">
                    {this.state.comments.map(this.eachComment)}
                </div>
            </div>
        );
    }
});

var CheckBox = React.createClass({
    getInitialState: function () {
        return {checked: true};
    },
    handleChecked: function () {
        this.setState({checked: !this.state.checked});
    },
    render: function () {
        var msg;
        if (this.state.checked) {
            msg = "checked";
        } else {
            msg = "unchecked";
        }
        return (
            <div>
                <input type="checkbox" onChange={this.handleChecked} defaultChecked={this.state.checked}/>
                <h3>Checkbox is {msg}</h3>
            </div>
        );
    }
});


ReactDOM.render(
    <div>
        <Board />
        <hr/>
        <CheckBox />
    </div>,
    document.getElementById("app")
);


