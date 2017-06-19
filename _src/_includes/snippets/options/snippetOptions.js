// Customise the placement of the snippet
// and ignore certain paths
snippetOptions: {

    // Ignore all HTML files within the templates folder
    ignorePaths: 'templates/*.html',

    // Provide a custom Regex for inserting the snippet.
    rule: {
        match: /<\/body>/i,
        fn: function (snippet, match) {
            return snippet + match;
        }
    }
}
