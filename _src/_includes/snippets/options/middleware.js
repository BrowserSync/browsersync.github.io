// Multiple Global Middlewares
middleware: [
    function (req, res, next) {
        /** First middleware handler **/
    },
    function (req, res, next) {
        /** Second middleware handler **/
    }
]

// Per-route middleware
// NOTE: requires v2.12.1
middleware: [
    {
        route: "/api",
        handle: function (req, res, next) {
            // handle any requests at /api
        }
    }
]

// Per-route + global middleware
// NOTE: requires v2.12.1
middleware: [
    require("compression")(), // global
    {
        route: "/api", // per-route
        handle: function (req, res, next) {
            // handle any requests at /api
        }
    }
]
