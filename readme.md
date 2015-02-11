Source code for [browsersync.io](http://browsersync.io/)

##Installation

To contribute, you'll need to fork this repo & install the following system-wide tools:

1. [NodeJS](http://nodejs.org) - use the installer.
2. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need to [fix npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions))

Next, you need to install the *local* development tools

```
$ npm install
```

##Development Server + BrowserSync
As you can probably imagine, this project actually uses BrowserSync along with Gulp, Crossbow & a few other awesome projects
to make development a joy. To experience the awesomeness, just run the following command

```
$ gulp
```

This will compile & prefix the `SCSS` files into `CSS`, build the Crossbow site once & launch a browser window to view the site.
Any changes made to SCSS files will will be auto-injected via BrowserSync & any changes to Markdown or HTML files will cause
Crossbow to rebuild the site. (in which case, BrowserSync will wait until it's finished & then reload all browsers for you).

##Build
This site is compiled with Crossbow, which means you need to `build` it before any
 of your code fixes or typos are displayed on the live site. This is done automatically for you if you 
 use the development environment mentioned above (by running `gulp`) - but if you need to trigger 
 it manually for html changes, run...
 
```bash 
$ gulp crossbow
```
 
... or, for sass/svg/other stuff, just try
 
```bash 
$ gulp build
```

Once built, commit all the changes and send you PR :)