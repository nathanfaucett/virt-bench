var suite = new Benchmark.Suite();


suite
    .on("cycle", function(event) {
        var simple = document.getElementById("simple0");
        simple.innerHTML += event.target + "<br\>";
        console.log(String(event.target));
    })
    .on("complete", function() {
        var simple = document.getElementById("simple1");
        simple.innerHTML += "Fastest is " + this.filter("fastest").map("name");
        console.log("Fastest is " + this.filter("fastest").map("name"));
    });


module.exports = suite;
