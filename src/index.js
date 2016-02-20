var environment = require("environment"),
    eventListener = require("event_listener"),
    suiteSimple = require("./suite-simple"),
    suiteUpdates = require("./suite-updates");


require("./react-simple");
require("./virt-simple");
require("./react-updates");
require("./virt-updates");


eventListener.on(environment.window, "load DOMContentLoaded", function() {
    suiteSimple.run({
        async: true
    });
    suiteUpdates.run({
        async: true
    });
});
