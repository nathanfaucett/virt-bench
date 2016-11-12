var eventListener = require("@nathanfaucett/event_listener"),
    suite = require("./suite");


var runTest = document.getElementById("run_test"),
    running = false;


require("./react-test");
require("./virt-test");


eventListener.on(runTest, "click", function onClick() {

    document.getElementById("app").innerHTML = "";
    document.getElementById("info-React").innerHTML = "";
    document.getElementById("info-virt").innerHTML = "";
    document.getElementById("done").innerHTML = "";

    if (!running) {
        running = true;

        suite.on("complete", function() {
            running = false;
        });
        suite.run({
            async: true
        });
    }
});
