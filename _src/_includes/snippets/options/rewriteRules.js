// replace every occurence of the word BrowserSync with 'kittenz'
rewriteRules: [
    {
        match: /BrowserSync/g,
        fn: function (match) {
            return "shane";
        }
    }
]