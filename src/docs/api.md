---
layout: "documentation.hbs"
title: "BrowserSync API"
markdown: false
---

Our API is incredibly simple & powerful. You can use it to create your own
tiny node program for local development or integrate with other tools. To use it, 
simply `require` the BrowserSync module like you would any other. This will give 
you access to the public methods detailed below.

{{ hl src="snippets/api/require.js" }}


<h3 id="api-browserSync">browserSync( config, cb ) <a href="#api-browserSync" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>



<ul class="param-list" id="api-browserSync-config">
    <li class="name">config <a href="#api-browserSync-config" class="page-anchor"><i class="icon icon-external-link"></i></a></li>
    <li class="type">Type: <span class="color-teal">Object</span>
        <span class="recede">[optional]</span>
    </li>
    <li class="desc"><p>This is the main configuration for your BrowserSync instance and can contain any of the <a href="{{site.links.options}}">available options</a>
 If you do not pass a config an argument for configuration, BrowserSync will still run; but it will be in the <code>snippet</code> mode</p>
</li>
</ul>

<ul class="param-list" id="api-browserSync-cb">
    <li class="name">cb <a href="#api-browserSync-cb" class="page-anchor"><i class="icon icon-external-link"></i></a></li>
    <li class="type">Type: <span class="color-teal">Function</span>
        <span class="recede">[optional]</span>
    </li>
    <li class="desc"><p>If you pass a callback function, it will be called when BrowserSync has completed all setup tasks and is ready to use. This
is useful when you need to wait for information (for example: urls, port etc) or perform other tasks synchronously.</p>
</li>
</ul>




{{#hl lang="js"}}
var config = {
    server: {
        baseDir: "./"
    }
};

// config only
browserSync(config);

// config + callback
browserSync(config, function (err, bs) {
    if (!err) {
        console.log("BrowserSync is ready!");
    }
});
{{/hl}}


<h3 id="api-reload">.reload( arg ) <a href="#api-reload" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>The <code>reload</code> method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.</p>



<ul class="param-list" id="api-reload-arg">
    <li class="name">arg <a href="#api-reload-arg" class="page-anchor"><i class="icon icon-external-link"></i></a></li>
    <li class="type">Type: <span class="color-teal">String | Array | Object</span>
        <span class="recede">[optional]</span>
    </li>
    <li class="desc"><p>The file or files to be reloaded. For
details and examples of Streams support, please see the <a href="{{site.links.gulp}}">GulpJS</a> examples</p>
</li>
</ul>




{{#hl lang="js"}}
// browser reload
browserSync.reload();

// single file
browserSync.reload( "styles.css" );

// multiple files
browserSync.reload( ["styles.css", "ie.css"] );

// streams support
browserSync.reload( { stream: true } );
{{/hl}}


<h3 id="api-notify">.notify( msg, timeout ) <a href="#api-notify" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>Helper method for browser notifications</p>



<ul class="param-list" id="api-notify-msg">
    <li class="name">msg <a href="#api-notify-msg" class="page-anchor"><i class="icon icon-external-link"></i></a></li>
    <li class="type">Type: <span class="color-teal">String | HTML</span>
        
    </li>
    <li class="desc"><p>Can be a simple message such as &#39;Connected&#39; or HTML</p>
</li>
</ul>

<ul class="param-list" id="api-notify-timeout">
    <li class="name">timeout <a href="#api-notify-timeout" class="page-anchor"><i class="icon icon-external-link"></i></a></li>
    <li class="type">Type: <span class="color-teal">Number</span>
        <span class="recede">[optional]</span>
    </li>
    <li class="desc"><p>How long the message will remain in the browser. @since 1.3.0</p>
</li>
</ul>




{{#hl lang="js"}}
browserSync.notify("Compiling, please wait!");

browserSync.notify("HTML <span color='green'>is supported</span> too!");

// Since 1.3.0, specify a timeout
browserSync.notify("This message will only last a second", 1000);
{{/hl}}


<h3 id="api-exit">.exit() <a href="#api-exit" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>This method will close any running server, stop file watching &amp; exit the current process.</p>



{{#hl lang="js"}}
browserSync(config, function (err, bs) {
    browserSync.exit();
});
{{/hl}}


<h3 id="api-pause">.pause() <a href="#api-pause" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>Method to pause file change events</p>



{{#hl lang="js"}}

{{/hl}}


<h3 id="api-resume">.resume() <a href="#api-resume" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>Method to resume paused watchers</p>



{{#hl lang="js"}}

{{/hl}}


<h3 id="api-paused">.paused <a href="#api-paused" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>A simple true/false flag to determine if the current instance is paused</p>



{{#hl lang="js"}}

{{/hl}}


<h3 id="api-active">.active <a href="#api-active" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>A simple true/false flag that you can use to determine if there&#39;s a currently-running BrowserSync instance.</p>



{{#hl lang="js"}}
console.log(browserSync.active); // false

browserSync(config, function (err, bs) {
    console.log(browserSync.active); // true
});
{{/hl}}


<h3 id="api-emitter">.emitter <a href="#api-emitter" class="page-anchor"><i class="icon icon-external-link"></i></a></h3>
<p>The internal Event Emitter used by the running BrowserSync instance (if there is one).
You can use this to emit your own events, such as changed files, logging etc.</p>



{{#hl lang="js"}}
var evt = browserSync.emitter;

evt.on("init", function () {
    console.log("BrowserSync is running!");
});

browserSync(config);
{{/hl}}

