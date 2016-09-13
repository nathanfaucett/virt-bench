var eventListener = require("@nathanfaucett/event_listener"),
    suite = require("./suite");


var runTest = document.getElementById("run_test"),
    running = false;


//require("./react-test");
require("./virt-test");


eventListener.on(runTest, "click", function onClick() {
    if (!running) {
        running = true;
        suite.run({
            async: true
        });
    }
});
