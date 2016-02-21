var suite = new Benchmark.Suite();


suite
    .on("cycle", function(event) {
        var updates = document.getElementById("info");
        updates.innerHTML += event.target + "<br\>";
        console.log(String(event.target));
    })
    .on("complete", function() {
        var updates = document.getElementById("done");
        updates.innerHTML = "Fastest is " + this.filter("fastest").map("name");
        console.log("Fastest is " + this.filter("fastest").map("name"));
    });


module.exports = suite;
