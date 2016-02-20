var virt = require("virt"),
    virtDOM = require("virt-dom"),
    suite = require("./suite-simple");


var app;


function renderSpan(content) {
    return virt.createView("span", {
        key: content
    }, content);
}

function renderCount(count) {
    var list = [],
        i = count;

    while (i--) {
        list[list.length] = renderSpan(i);
    }

    list.unshift(renderSpan(count));

    return (
        virt.createView("p", {
            className: "count " + count
        }, list)
    );
}

function renderCounter(count) {
    return (
        virt.createView("div", {
            className: "counter " + count
        }, renderCount(count))
    );
}

var dir = 1,
    count = -1;

function render(n, deferred) {
    if (dir === 1 && count >= 5) {
        dir = -1;
    } else if (dir === -1 && count <= 0) {
        dir = 1;
    }

    count += dir;

    virtDOM.render(renderCounter(count), app);

    if (n !== 0) {
        render(n - 1, deferred);
    } else {
        deferred.resolve();
    }
}

suite.add("virt-simple", {
    defer: true,
    fn: function(deferred) {
        app = document.getElementById("simple");
        app.innerHTML = "";
        render(10, deferred);
    }
});
