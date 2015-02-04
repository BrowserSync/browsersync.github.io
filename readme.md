Source code for [browsersync.io](http://browsersync.io/)

##Installation

To contribute, you'll need to fork this repo & install the following system-wide tools:

1. [NodeJS](http://nodejs.org) - use the installer.
2. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)

Next, you need to install the *local* development tools

```
$ npm install
```

##Server + BrowserSync
As you can probably imagine, this project actually uses BrowserSync along with Gulp, Crossbow & a few other awesome projects
to make development a joy. To experience the awesomeness, just run the run the following command

```
$ gulp
```

This will compile & prefix the `SCSS` files into `CSS`, build the Crossbow site once & launch a browser window to view the site.
Any changes made to SCSS files will will be auto-injected via BrowserSync & any changes to Markdown or HTML files will cause
Crossbow to rebuild the site. (in which case, BrowserSync will wait until it's finished & then reload all browsers for you).