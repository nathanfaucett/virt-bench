var suite = new Benchmark.Suite();


suite
    .on("cycle", function(event) {
        var updates = document.getElementById("updates0");
        updates.innerHTML += event.target + "<br\>";
        console.log(String(event.target));
    })
    .on("complete", function() {
        var updates = document.getElementById("updates1");
        updates.innerHTML = "Fastest is " + this.filter("fastest").map("name");
        console.log("Fastest is " + this.filter("fastest").map("name"));
    });


module.exports = suite;
