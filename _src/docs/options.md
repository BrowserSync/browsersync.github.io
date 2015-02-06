---
layout: "documentation.hbs"
title: "BrowserSync options"
page-label: "options"
sidebar: "_includes/options-sidebar.hbs"
markdown: false
---

{{#md}}
These are all the options that you can configure when using BrowserSync. Create a single object and pass 
it as the [first argument](/docs/api/#api-browserSync) (for GulpJS and normal API usage). If you're using Grunt, you can 
still use all of these options, but you need to provide them as detailed in the [BrowserSync Grunt Documentation]({{site.links.grunt}})
{{/md}}

{{hl src="snippets/options/require.js" }}


<h3 id="option-ui"><a href="#option-ui" class="page-anchor">ui</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Object</span>
    
        <ul class="nav nav--stacked subprops">
            
                <li><b>port</b> - Default: <span class="color-teal">3001</span></li>
            
                <li><b>weinre.port</b> - Default: <span class="color-teal">8080</span></li>
            
        </ul>
    </li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 2.0.0</p>


<p>BrowserSync includes a user-interface that is accessed via a separate port.
The UI allows to controls all devices, push sync updates and much more.</p>

{{#hl lang="js" }}
// Change the default port
ui: {
    port: 8080
}

// Change the default weinre port
ui: {
    port: 8080,
    weinre: {
        port: 9090
    }
}

// Disable UI completely
ui: false

{{/hl}}

<h3 id="option-files"><a href="#option-files" class="page-anchor">files</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Array | String</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">false</span></li>
    
</ul>



<p>BrowserSync can watch your files as you work. Changes you make will either
be injected into the page (CSS &amp; images) or will cause all browsers to do
a full-page refresh. See <a href="https://github.com/isaacs/minimatch">isaacs&#39;s minimatch</a> for more information on glob patterns.</p>

{{#hl lang="js" }}
// single file
files: "app/css/style.css"

// multiple files
files: ["app/css/style.css", "app/css/ie.css"]

// watch all files under app/css (including sub directories)
files: "app/css/**"

// multiple globs
files: ["app/css/*.css", "app/**.*.html", "app/js/**/*.js"]
{{/hl}}

<h3 id="option-watchOptions"><a href="#option-watchOptions" class="page-anchor">watchOptions</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Object</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">undefined</span></li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.3.0</p>


<p>File watching options that get passed along to <a href="https://github.com/shama/gaze">Gaze</a>. Check out the <a href="https://github.com/shama/gaze#properties">properties</a>
section of their docs to see which options they support.
for availbable options</p>

{{#hl lang="js" }}
// Options passed to Gaze
watchOptions: {
    debounceDelay: 1000
}
{{/hl}}

<h3 id="option-server"><a href="#option-server" class="page-anchor">server</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Object | Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">false</span></li>
    
</ul>



<p>Use the built-in static server for basic HTML/JS/CSS websites.</p>

{{#hl lang="js" }}
// Serve files from the app directory
server: {
    baseDir: "app"
}

// Serve files from the app directory with directory listing
server: {
    baseDir: "app",
    directory: true
}

// Multiple base directories
server: {
    baseDir: ["app", "dist"]
}

// Serve files from the app directory, with a specific index filename
server: {
    baseDir: "app",
    index: "index.htm"
}

// Since version 1.2.1
server: {
    baseDir: "app",
    routes: {
        "/bower_components": "../bower_components"
    }
}

// Custom Middleware
server: {
    baseDir: "./",
    middleware: function (req, res, next) {
        console.log("Hi from middleware");
        next();
    }
}

// Multiple custom Middlewares
server: {
    baseDir: "./",
    middleware: [
        function (req, res, next) {
            console.log("Hi from first middleware");
            next();
        },
        function (req, res, next) {
            console.log("Hi from the second middleware");
            next();
        }
    ]
}
{{/hl}}

<h3 id="option-proxy"><a href="#option-proxy" class="page-anchor">proxy</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String | Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">false</span></li>
    
</ul>



<p>Proxy an EXISTING vhost. BrowserSync will wrap your existing url and provide a different one to use.</p>

{{#hl lang="js" }}
// Using a vhost-based url
proxy: "local.dev"

// Using a localhost address with a port
proxy: "localhost:8888"

// Using localhost sub directories
proxy: "localhost/site1"
{{/hl}}

<h3 id="option-port"><a href="#option-port" class="page-anchor">port</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Number</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">3000</span></li>
    
</ul>




{{#hl lang="js" }}
// Use a specific port (instead of the one auto-detected by BrowserSync)
port: 8080
{{/hl}}

<h3 id="option-https"><a href="#option-https" class="page-anchor">https</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">undefined</span></li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.3.0</p>


<p>Enable https for localhost development. <strong>Note:</strong> Proxy and Tunnel not currently supported.</p>

{{#hl lang="js" }}
// Enable HTTPS for static file server
https: true
{{/hl}}

<h3 id="option-ghostMode"><a href="#option-ghostMode" class="page-anchor">ghostMode</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Object</span>
    
        <ul class="nav nav--stacked subprops">
            
                <li><b>clicks</b> - Default: <span class="color-teal">true</span></li>
            
                <li><b>scroll</b> - Default: <span class="color-teal">true</span></li>
            
                <li><b>forms</b> - Default: <span class="color-teal">true</span></li>
            
        </ul>
    </li>
    
</ul>



<p>Clicks, Scrolls &amp; Form inputs on any device will be mirrored to all others.</p>

{{#hl lang="js" }}
// Here you can disable/enable each feature individually
ghostMode: {
    clicks: true,
    forms: true,
    scroll: false
}

// Or switch them all off in one go
ghostMode: false
{{/hl}}

<h3 id="option-logLevel"><a href="#option-logLevel" class="page-anchor">logLevel</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">info</span></li>
    
</ul>



<p>Can be either &quot;info&quot;, &quot;debug&quot;, &quot;warn&quot;, or &quot;silent&quot;</p>

{{#hl lang="js" }}
// Show me additional info about the process
logLevel: "debug"

// Just show basic info
logLevel: "info"

// output NOTHING to the commandline
logLevel: "silent"
{{/hl}}

<h3 id="option-logPrefix"><a href="#option-logPrefix" class="page-anchor">logPrefix</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">BS</span></li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.5.1</p>


<p>Change the console logging prefix. Useful if you&#39;re creating your
own project based on BrowserSync</p>

{{#hl lang="js" }}
logPrefix: "My Awesome Project"

// [My Awesome Project] Local URL: http://localhost:3000
// [My Awesome Project] Watching files....
// [My Awesome Project] File changed: "index.html"
{{/hl}}

<h3 id="option-logConnections"><a href="#option-logConnections" class="page-anchor">logConnections</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">false</span></li>
    
</ul>




{{#hl lang="js" }}
// Log connections
logConnections: true

// Don't log connections
logConnections: false
{{/hl}}

<h3 id="option-logFileChanges"><a href="#option-logFileChanges" class="page-anchor">logFileChanges</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>




{{#hl lang="js" }}
// Log information about changed files
logFileChanges: true

// Don't log file changes
logFileChanges: false
{{/hl}}

<h3 id="option-logSnippet"><a href="#option-logSnippet" class="page-anchor">logSnippet</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">: Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.5.2</p>


<p>Log the snippet to the console when you&#39;re in snippet mode (no proxy/server)</p>

{{#hl lang="js" }}
// Don't ever log the snippet
logSnippet: false
{{/hl}}

<h3 id="option-snippetOptions"><a href="#option-snippetOptions" class="page-anchor">snippetOptions</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Object</span>
    
        <ul class="nav nav--stacked subprops">
            
                <li><b>ignorePaths</b> - Default: <span class="color-teal">undefined</span></li>
            
                <li><b>rule.match</b> - Default: <span class="color-teal">/&lt;body&#91;^&gt;&#93;*&gt;/i</span></li>
            
                <li><b>rule.fn</b> - Default: <span class="color-teal">Function</span></li>
            
        </ul>
    </li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.7.0</p>


<p>SINCE 1.7.0! You can control how the snippet is injected
onto each page via a custom regex + function.
You can also provide patterns for certain urls
that should be ignored from the snippet injection.</p>

{{#hl lang="js" }}
// Customise the placement of the snippet
// and ignore certain paths
snippetOptions: {

    // Ignore all HTML files within the templates folder
    ignorePaths: "templates/*.html",

    // Provide a custom Regex for inserting the snippet.
    rule: {
        match: /<\/body>/i,
        fn: function (snippet, match) {
            return snippet + match;
        }
    }
}
{{/hl}}

<h3 id="option-tunnel"><a href="#option-tunnel" class="page-anchor">tunnel</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String | Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">null</span></li>
    
</ul>




{{#hl lang="js" }}
// Tunnel the BrowserSync server through a random Public URL
// -> http://randomstring23232.localtunnel.me
tunnel: true

// Attempt to use the URL "http://my-private-site.localtunnel.me"
tunnel: "my-private-site"
{{/hl}}

<h3 id="option-online"><a href="#option-online" class="page-anchor">online</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">undefined</span></li>
    
</ul>



<p>Some features of BrowserSync (such as <code>xip</code> &amp; <code>tunnel</code>) require an internet connection, but if you&#39;re
working offline, you can reduce start-up time by setting this option to <code>false</code></p>

{{#hl lang="js" }}
// Will not attempt to determine your network status, assumes you're ONLINE.
online: true

// Will not attempt to determine your network status, assumes you're OFFLINE
online: false
{{/hl}}

<h3 id="option-open"><a href="#option-open" class="page-anchor">open</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean | String</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>



<p>Decide which URL to open automatically when BrowserSync starts. Defaults to &quot;local&quot; if none set.
Can be true, &quot;local&quot;, &quot;external&quot; or &quot;tunnel&quot;</p>

{{#hl lang="js" }}
// Stop the browser from automatically opening
open: false

// Open the localhost URL
open: true

// The following availble since v1.3.0

// Open the external URL - must be online.
open: "external"

// Open the tunnel URL - must also set the `tunnel` option
open: "tunnel"
{{/hl}}

<h3 id="option-browser"><a href="#option-browser" class="page-anchor">browser</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String | Array</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">default</span></li>
    
</ul>




{{#hl lang="js" }}
// Open the site in Chrome
browser: "google chrome"

// Open the site in Chrome & Firefox
browser: ["google chrome", "firefox"]
{{/hl}}

<h3 id="option-xip"><a href="#option-xip" class="page-anchor">xip</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">false</span></li>
    
</ul>



<p>Requires an internet connection - useful for services such as <a href="https://typekit.com/">Typekit</a>
as it allows you to configure domains such as <code>*.xip.io</code> in your kit settings</p>

{{#hl lang="js" }}
// Append '.xip.io' to the hostname. (eg: http://192.168.0.4.xip.io:3002)
xip: true
{{/hl}}

<h3 id="option-reloadOnRestart"><a href="#option-reloadOnRestart" class="page-anchor">reloadOnRestart</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>



<p>Reload each browser when BrowserSync is restarted.</p>

{{#hl lang="js" }}

{{/hl}}

<h3 id="option-notify"><a href="#option-notify" class="page-anchor">notify</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>



<p>The small pop-over notifications in the browser are not always needed/wanted.</p>

{{#hl lang="js" }}
// Don't show any notifications in the browser.
notify: false
{{/hl}}

<h3 id="option-scrollProportionally"><a href="#option-scrollProportionally" class="page-anchor">scrollProportionally</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>




{{#hl lang="js" }}
scrollProportionally: false // Sync viewports to TOP position
{{/hl}}

<h3 id="option-scrollThrottle"><a href="#option-scrollThrottle" class="page-anchor">scrollThrottle</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Number</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">0</span></li>
    
</ul>




{{#hl lang="js" }}
scrollThrottle: 100 // only send scroll events every 100 milliseconds
{{/hl}}

<h3 id="option-reloadDelay"><a href="#option-reloadDelay" class="page-anchor">reloadDelay</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Number</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">0</span></li>
    
</ul>




{{#hl lang="js" }}
// Wait for 2 seconds before any browsers should try to inject/reload a file.
reloadDelay: 2000
{{/hl}}

<h3 id="option-injectChanges"><a href="#option-injectChanges" class="page-anchor">injectChanges</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>




{{#hl lang="js" }}
// Inject CSS changes
injectChanges: true,

// Don't try to inject, just do a page refresh
injectChanges: false,
{{/hl}}

<h3 id="option-startPath"><a href="#option-startPath" class="page-anchor">startPath</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String | Null</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">null</span></li>
    
</ul>




{{#hl lang="js" }}
// Open the first browser window at URL + "/info.php"
startPath: "/info.php"
{{/hl}}

<h3 id="option-minify"><a href="#option-minify" class="page-anchor">minify</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>



<p>Whether to minify client script, or not.</p>

{{#hl lang="js" }}
// Don't minify the client-side JS
minify: false
{{/hl}}

<h3 id="option-host"><a href="#option-host" class="page-anchor">host</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">String</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">null</span></li>
    
</ul>




{{#hl lang="js" }}
// Override host detection if you know the correct IP to use
host: "192.168.1.1"
{{/hl}}

<h3 id="option-codeSync"><a href="#option-codeSync" class="page-anchor">codeSync</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>




{{#hl lang="js" }}
// Don't send any file-change events to browsers
codeSync: true,
{{/hl}}

<h3 id="option-timestamps"><a href="#option-timestamps" class="page-anchor">timestamps</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Boolean</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">true</span></li>
    
</ul>




{{#hl lang="js" }}
// Don't append timestamps to injected files
timestamps: false
{{/hl}}

<h3 id="option-scriptPath"><a href="#option-scriptPath" class="page-anchor">scriptPath</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Function</span>
    
    </li>
    <li class="default">Default: <span class="color-teal">undefined</span></li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.5.0</p>


<p>Alter the script path for complete control over where the BrowserSync
Javascript is served from. Whatever you return from this function
will be used as the script path.</p>

{{#hl lang="js" }}
// This will result in something like
// <script src="localhost:3002/browser-sync/browser-sync-client.1.6.0.js" />
scriptPath: function (path) {
    return "localhost:3002" + path;
}
{{/hl}}

<h3 id="option-socket"><a href="#option-socket" class="page-anchor">socket</a> <a href="#top" class="back-to-top">^ TOP</a></h3>
<ul class="param-list">
    <li class="type">Type: <span class="color-teal">Object</span>
    
        <ul class="nav nav--stacked subprops">
            
                <li><b>path</b> - Default: <span class="color-teal">"/browser-sync/socket.io"</span></li>
            
                <li><b>clientPath</b> - Default: <span class="color-teal">"/browser-sync"</span></li>
            
                <li><b>namespace</b> - Default: <span class="color-teal">"/browser-sync"</span></li>
            
                <li><b>clients.heartbeatTimeout</b> - Default: <span class="color-teal">5000</span></li>
            
        </ul>
    </li>
    
</ul>


<p class="lede warning"><b>Note: </b> requires at least version 1.6.2</p>


<p>Configure the Socket.IO path and namespace to avoid collisions. Note: <code>namespace</code> can also be a function</p>

{{#hl lang="js" }}
// This will result in something like this in
// the socket connector code
// browserSync.io('localhost:3003/browser-sync')
socket: {
    namespace: function (namespace) {
        return "localhost:3003" + namespace;
    }
}
{{/hl}}

