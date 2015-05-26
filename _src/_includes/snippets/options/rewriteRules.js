// replace every occurrence of the word Browsersync with 'kittenz'
rewriteRules: [
    {
        match: /Browsersync/g,
        fn: function (match) {
            return 'kittenz';
        }
    }
]