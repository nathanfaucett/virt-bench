var createSeededRandom = require("./createSeededRandom");


module.exports = createData;


function createData(count, data, parent, random) {
    var list, i, il;

    data.name = (parent ? parent.name + "-" : "") + count;

    if (count !== 0) {
        list = new Array((random() * 5) | 0);

        data.list = list;

        for (i = 0, il = list.length; i < il; i++) {
            list[i] = createData(count - 1, {}, data, random);
        }
    }

    return data;
}
