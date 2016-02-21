var MULTIPLIER = 1664525,
    MODULO = 4294967295,
    OFFSET = 1013904223;


module.exports = createSeededRandom;


function createSeededRandom() {
    var seed = (MODULO / 2) | 0;

    function random(t) {
        seed = ((MULTIPLIER * seed + OFFSET) % MODULO);
        return seed / MODULO;
    }

    return random;
}
