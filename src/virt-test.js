var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    arrayMap = require("@nathanfaucett/array-map"),
    EventEmitter = require("@nathanfaucett/event_emitter"),
    createData = require("./createData"),
    createSeededRandom = require("./createSeededRandom"),
    suite = require("./suite");


var ee = new EventEmitter(),
    Component = virt.Component;


function Comp(props, children, context) {
    var _this = this;

    Component.call(this, props, children, context);

    this.state = props;

    this.__onUpdate = function(data) {
        _this.replaceState(data);
    };
}
Component.extend(Comp, "Comp");

Comp.prototype.componentDidMount = function() {
    if (this.state.isTop) {
        ee.on("update", this.__onUpdate);
    }
};

Comp.prototype.render = function() {
    var state = this.state,
        children;

    if (state.list) {
        children = arrayMap(state.list, function each(child) {
            return virt.createView(Comp, child, child.name);
        });

        children.unshift(state.name);

        return (
            virt.createView("div", {
                className: "Comp",
                key: state.name
            }, children)
        );
    } else {
        return (
            virt.createView("div", {
                className: "Comp",
                key: state.name
            }, state.name)
        );
    }
};


var first = true,
    random = createSeededRandom();

suite.add("virt", {
    defer: true,
    fn: function fn(deferred) {
        var app = document.getElementById("app");

        if (first) {
            first = false;
            app.innerHTML = "";
            virtDOM.render(virt.createView(Comp, createData(3, {
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
        random = createSeededRandom();
    }
});
