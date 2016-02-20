var virt = require("virt"),
    virtDOM = require("virt-dom"),
    arrayMap = require("array-map"),
    suite = require("./suite-updates");


var Component = virt.Component;


function Comp(props, children, context) {
    Component.call(this, props, children, context);
}
Component.extend(Comp, "Comp");

Comp.prototype.render = function() {
    var props = this.props,
        children;

    if (props.list) {
        children = arrayMap(props.list, function each(child) {
            return virt.createView(Comp, child, child.name);
        });

        children.unshift(props.name);

        return (
            virt.createView("div", {
                className: "Comp",
                key: props.name
            }, children)
        );
    } else {
        return (
            virt.createView("div", {
                className: "Comp",
                key: props.name
            }, props.name)
        );
    }
};

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

suite.add("virt-updates", {
    defer: true,
    fn: (function() {
        var first = true;
        return function(deferred) {
            var app = document.getElementById("updates");
            if (first) {
                first = false;
                app.innerHTML = "";
            }
            virtDOM.render(virt.createView(Comp, createData(2, {}, null)), app);
            deferred.resolve();
        };
    }())
});
