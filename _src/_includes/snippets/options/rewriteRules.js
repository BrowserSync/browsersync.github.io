// Replace every occurrence of the word Browsersync with 'kittenz'
rewriteRules: [
    {
        match: /Browsersync/g,
        fn: function (req, res, match) {
            return 'kittenz';
        }
    }
]

// Also accepts a string as a replacement
rewriteRules: [
    {
        match: /(cats|kitten[sz]) are mediocre/g,
        replace: '$1 are excellent'
    }
]
