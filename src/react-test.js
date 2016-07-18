var arrayMap = require("@nathanfaucett/array-map"),
    EventEmitter = require("@nathanfaucett/event_emitter"),
    createData = require("./createData"),
    createSeededRandom = require("./createSeededRandom"),
    suite = require("./suite");


var ee = new EventEmitter();


var Comp = React.createClass({
    onUpdate: function(data) {
        this.setState(data);
    },
    getInitialState: function() {
        return this.props;
    },
    componentDidMount: function() {
        if (this.state.isTop) {
            ee.on("update", this.onUpdate);
        }
    },
    render: function() {
        var state = this.state,
            children;

        if (state.list) {
            children = arrayMap(state.list, function each(child) {
                return React.createElement(Comp, child, child.name);
            });

            children.unshift(state.name);

            return (
                React.createElement("div", {
                    className: "Comp",
                    key: state.name
                }, children)
            );
        } else {
            return (
                React.createElement("div", {
                    className: "Comp",
                    key: state.name
                }, state.name)
            );
        }
    }
});

suite.add("React", {
    defer: true,
    fn: (function() {
        var first = true,
            random = createSeededRandom();

        return function(deferred) {
            var app = document.getElementById("app");
            if (first) {
                first = false;
                app.innerHTML = "";
                ReactDOM.render(React.createElement(Comp, createData(3, {
                    isTop: true
                }, null, random)), app);
            } else {
                ee.emit("update", createData(3, {
                    isTop: true
                }, null, random));
            }
            deferred.resolve();
        };
    }())
});
