var arrayMap = require("@nathanfaucett/array-map"),
    EventEmitter = require("@nathanfaucett/event_emitter"),
    PseudoRandom = require("@nathanfaucett/pseudo_random"),
    createData = require("./createData"),
    suite = require("./suite");


var ee = new EventEmitter();


var Comp = React.createClass({
    onUpdate: function(data) {
        this.replaceState(data);
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
                    key: state.name,
                    value: random()
                }, children)
            );
        } else {
            return (
                React.createElement("div", {
                    className: "Comp",
                    key: state.name,
                    value: random()
                }, state.name)
            );
        }
    }
});


var first = true,
    prng = new PseudoRandom();

function random() {
    return prng.nextFloat();
}

suite.add("React", {
    defer: true,
    fn: function fn(deferred) {
        var app = document.getElementById("app");

        if (first) {
            first = false;
            app.innerHTML = "";
            ReactDOM.render(React.createElement(Comp, createData(3, {
                isTop: true
            }, null, random)), app);
        } else {
            ee.emitArg("update", createData(3, {
                isTop: true
            }, null, random));
        }
        deferred.resolve();
    },
    onComplete: function onComplete() {
        first = true;
        prng = new PseudoRandom();
    }
});
