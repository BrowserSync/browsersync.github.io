var fs           = require("fs");
var doc          = "../_doc/yuidoc.json";
var docGen       = require("./_docgen");
var marked       = require('marked');
var _            = require("lodash");
_.templateSettings.interpolate = /{:([\s\S]+?):}/g;

var excluded = [
    "use"
];

var data = require(doc);

function renameBranding(item) {
    if (item.description) {
        item.description = item.description.replace(/BrowserSync/g, 'Browsersync');
    }
    if (item.params) {
        item.params = item.params.map(function (item) {
            if (item.description) {
                item.description = item.description.replace(/BrowserSync/g, 'Browsersync');
            }
            return item;
        })
    }
    return item;
}
/**
 * Process API
 */
var apiItems = docGen.prepareClassitems(data.classitems)
    .filter(removeExcluded)
    .filter(renameBranding)
    .map(previewTweaks)
    .sort(function (a, b) {
        return a.line - b.line;
    });

fs.writeFileSync("./_doc/api.json", JSON.stringify(apiItems, null, 4));

//var compiledApi .reduce(buildMarkup, "");

//fs.writeFileSync("./_src/docs/api.md", mdTemp({data: compiledApi}));

/**
 * Process OPTIONS
 *
 */

var out = docGen.prepareOptions(data.classitems)
    .map(renameBranding)
    .map(optionsMarkup);

fs.writeFileSync("./_doc/options.json", JSON.stringify(out, null, 4));

//fs.writeFileSync("./_src/docs/options.md", optTemp({data: optItems}));


/**
 * Resolve path to snippets
 * @param name
 * @param path
 * @returns {string}
 */
function getSnippetPath(name, path) {
    return "./_src/_includes/snippets/%p/%s.js".replace("%s", name).replace("%p", path);
}

/**
 * Don't allow any method that are present in 'excluded' list
 * @param item
 * @returns {*}
 */
function removeExcluded(item) {
    return !_.contains(excluded, item.name);
}

/**
 * Final tweaks to preview snippet
 * @param item
 * @returns {*}
 */
function previewTweaks(item) {
    if (item.name === "browserSync") {
        item.preview = item.preview.replace(".", "");
    }
    return item;
}

/**
 * @param item
 * @returns {*}
 */
function fixDescription(item) {

    if (item.description) {
        item.description = marked(item.description);
    } else {
        item.description = "";
    }

    return item;
}

/**
 * Build the markup for each item
 * @param combined
 * @param item
 * @returns {*}
 */
function optionsMarkup (item) {

    item.snippet = getSnippet(item, "options");

    if (!item.description) {
        item.description = "";
    }

    return item;
}

/**
 * Look for related snippet
 * @param item
 * @param type
 * @returns {*}
 */
function getSnippet(item, type) {

    var snippet = null;

    try {

        var snippetPath = getSnippetPath(item.name, type);

        if (fs.existsSync(snippetPath)) {
            snippet = fs.readFileSync(snippetPath, "utf-8");
        }

    } catch (e) {

        console.log(e.message);

    }

    return snippet;
}
