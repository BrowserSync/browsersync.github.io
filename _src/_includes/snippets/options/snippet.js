// CLI
browser-sync ./app -w --no-snippet

// API
const bs = require('browser-sync').create();
bs.init({
    watch: true,
    server: "./app",
    snippet: false
})
