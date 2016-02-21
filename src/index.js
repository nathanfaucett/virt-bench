var suite = require("./suite");


require("./react-test");
require("./virt-test");


suite.run({
    async: true
});
