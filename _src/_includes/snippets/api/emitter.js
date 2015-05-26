var bs = require("browser-sync").create();

// Listen for the `init` event
bs.emitter.on("init", function () {
    console.log("Browsersync is running!");
});

bs.init(config);