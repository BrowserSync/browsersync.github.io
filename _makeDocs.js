var fs           = require("fs");
var doc          = "./_doc/yuidoc.json";
var docGen       = require("./_docgen");
var opts         = require("browser-sync/lib/cli/opts.json");
var pretemplater = require("pretemplater");
var marked       = require('marked');
var _            = require("lodash");
_.templateSettings.interpolate = /{:([\s\S]+?):}/g;

var mdTemp          = _.template(fs.readFileSync("./_src/_docs/api.md", "utf-8"));
var optTemp         = _.template(fs.readFileSync("./_src/_docs/options.md", "utf-8"));

function getTemplate(name) {

    var source = fs.readFileSync("./_src/_tmp/_%s.tmpl.html".replace("%s", name), "utf-8");
    var template = pretemplater(source);
    return  _.template(template);
}

var excluded = [
    "use"
];

var data = require(doc);

/**
 * Process API
 */
var apiItems = docGen.prepareClassitems(data.classitems)
    .filter(removeExcluded)
    .map(previewTweaks)
    .reduce(buildMarkup, "");

fs.writeFileSync("./_src/docs/api.md", mdTemp({data: apiItems}));

/**
 * Process OPTIONS
 *
 */

var out = docGen.prepareOptions(data.classitems);

fs.writeFileSync("./_doc/options.json", JSON.stringify(out, null, 4));

var optItems = out
    .reduce(optionsMarkup, "");

fs.writeFileSync("./_src/docs/options.md", optTemp({data: optItems}));


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
 * Build the markup for each item
 * @param combined
 * @param item
 * @returns {*}
 */
function buildMarkup (combined, item) {

    item.snippet = getSnippet(item, "api") || false;

    if (!item.description) {
        item.description = "";
    } else {
        item.description = marked(item.description);
    }

    if (item.params) {
        item.params = item.params.map(fixDescription);
    }

    return combined + getTemplate("api")(item);
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
function optionsMarkup (combined, item) {

    item.snippet = getSnippet(item, "options");

    if (!item.description) {
        item.description = "";
    } else {
        item.description = marked(item.description);
    }

    if (item.type) {
        return combined + getTemplate("option")(item);
    }

    return combined;

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
