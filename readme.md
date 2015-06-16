Source code for [browsersync.io](http://browsersync.io/)

## Installation

To contribute, you'll need to fork this repo & install [Node](https://nodejs.org/download/).

Next, you need to install the *local* development tools

```
$ npm install
```

## Development Server + Browsersync

As you can probably imagine, this project actually uses [Browsersync](https://github.com/browsersync/browser-sync) along with [gulp.js](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md), [Crossbow](https://github.com/Crossbow-js/crossbow) & a few other awesome projects
to make development a joy. To experience the awesomeness, just run the following command

```
$ npm start
```

This will compile & prefix the `SCSS` files into `CSS`, build the Crossbow site once & launch a browser window to view the site.
Any changes made to SCSS files will will be auto-injected via BrowserSync & any changes to Markdown or HTML files will cause
Crossbow to rebuild the site. (in which case, BrowserSync will wait until it's finished & then reload all browsers for you).

## Build

This site is compiled with Crossbow, which means you need to `build` it before any
 of your code fixes or typos are displayed on the live site. This is done automatically for you if you 
 use the development environment mentioned above (by running `npm start`) - but if you need to trigger 
 it manually for html changes, run...
 
```
$ npm run build
```

Once built, commit all the changes and send you PR :)
