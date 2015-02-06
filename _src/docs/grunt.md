---
layout: "documentation.hbs"
title: "BrowserSync + Grunt.js"
page-label: "grunt"
sidebar: "_includes/grunt-sidebar.hbs"
---

We have an [official Plugin]({{site.links.grunt-github}}) for Grunt that makes it easy to incorporate
BrowserSync into your development workflow. Below are a few examples of common configurations to get you started - use them
as a jump-start but don't forget you can also use any of the other [BrowserSync options]({{site.links.options}}) as well.

{{ inc src="_includes/headerlink.html" title="Install" slug="grunt-install" }}

First, you'll need to install the BrowserSync Plugin...

{{ hl src="snippets/grunt/install.txt" lang="html" }}

... and then add this line to your `Gruntfile.js`

{{#hl lang="js"}}
grunt.loadNpmTasks('grunt-browser-sync');
{{/hl}}

{{ inc src="_includes/headerlink.html" title="Static File Server" slug="grunt-server" }}

The simplest example would be watching CSS files and using the built-in server for static
HTML/CSS/JS files. This config alone will launch a mini-server (using your current working directory
as the base), watch your CSS files for changes & auto-inject those changes into all connected browsers. 

{{ hl src="snippets/grunt/server.simple.js" }}

{{ inc src="_includes/headerlink.html" title="Proxy" slug="grunt-proxy" }}

If you already have a local server setup (with your vhosts etc), just tell BrowserSync all about it & it will do the rest for you.

{{ hl src="snippets/grunt/proxy.js" }}

{{ inc src="_includes/headerlink.html" title="+ other watch tasks" slug="grunt-watch" }}

Browser Sync is not a replacement for regular `watch` tasks (such as compiling SASS, LESS etc), 
they are designed to be used together. If you intend to do this, you'll need to set `watchTask: true` and be sure to call 
the watch task AFTER browserSync. For example, to compile SASS and then inject the CSS into all open browsers 
(without a page refresh), your config for all three tasks might look something like this:

{{ hl src="snippets/grunt/full.watch.js" }}
