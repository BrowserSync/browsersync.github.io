// First run `npm install bs-html-injector`
// Then provide the module name
plugins: ['bs-html-injector']

// If the plugin you are using requires options
// just as bs-snippet-injector requires a 'file' option,
// you can pass an object instead like this.
plugins: [
    {
        module: 'bs-snippet-injector',
        options: {
            file: './app/index.php'
        }
    }
]

// Shorthand for bs-html-injector + files: ['*.html'] option
// NOTE: requires v2.12.1
plugins: ['bs-html-injector?files[]=*.html']
