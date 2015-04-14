var bs = require("browser-sync").create();

// -> false as .init has not yet been called
console.log(bs.active);

bs.init(config, function (err, bs) {

    // -> now true since BS is running now
    console.log(bs.active);
});