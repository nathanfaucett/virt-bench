var React = require("react"),
    ReactDOM = require("react-dom"),
    arrayMap = require("array-map"),
    suite = require("./suite-updates");


var Comp = React.createClass({
    render: function() {
        var props = this.props,
            children;

        if (props.list) {
            children = arrayMap(props.list, function each(child) {
                return React.createElement(Comp, child, child.name);
            });

            children.unshift(props.name);

            return (
                React.createElement("div", {
                    className: "Comp",
                    key: props.name
                }, children)
            );
        } else {
            return (
                React.createElement("div", {
                    className: "Comp",
                    key: props.name
                }, props.name)
            );
        }
    }
});

function createData(count, data, parent) {
    var list, i, il;

    data.name = (parent ? parent.name + "-" : "") + count;

    if (count !== 0) {
        list = new Array((Math.random() * 5) | 0);

        data.list = list;

        for (i = 0, il = list.length; i < il; i++) {
            list[i] = createData(count - 1, {}, data);
        }
    }

    return data;
}

suite.add("React-updates", {
    defer: true,
    fn: (function() {
        var first = true;
        return function(deferred) {
            var app = document.getElementById("updates");
            if (first) {
                first = false;
                app.innerHTML = "";
            }
            ReactDOM.render(React.createElement(Comp, createData(2, {}, null)), app);
            deferred.resolve();
        };
    }())
});
