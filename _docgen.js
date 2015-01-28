var _    = require("lodash");
_.templateSettings.interpolate = /{:([\s\S]+?):}/g;

/**
 * Add an empty array if none exist
 * @param item
 * @returns {*}
 */
function addParams(item) {
    if (!Array.isArray(item.params)) {
        item.params = [];
    }
    return item;
}

/**
 * Use the method/property name to create the preview text
 * @param item
 * @returns {*}
 */
function addPreview (item) {

    if (item.itemtype === "method") {

        if (item.params.length) {
            nameTemplate = ".%s( %p )";
        } else {
            nameTemplate = ".%s()";
        }
    }

    if (item.itemtype === "property") {
        nameTemplate = ".%s";
    }

    if (nameTemplate) {

        var params = item.params.map(function (current) {
            return current.name;
        }).join(", ");

        item.preview = nameTemplate
            .replace("%s", item.name)
            .replace("%p", params);
    }

    return item;
}

/**
 * Ensure only items with a @name property are added
 * @param item
 * @returns {boolean}
 */
function hasNameFilter (item) {
    return !_.isUndefined(item.name);
}

/**
 * Ensure all methods are output before properties
 * @param item
 * @returns {boolean}
 */
function sortItems(item) {
    return item.itemtype !== "method";
}

/**
 * @param item
 * @returns {*}
 */
function fixParams(item) {

    if (item.params && item.params.length) {

        item.params = item.params.map(function (param) {
            param.type = replacePipe(param.type);
            return param;
        });
    } else {
        if (item.itemtype === "property") {
            if (item.type) {
                item.type = replacePipe(item.type);
            }
        }
    }

    function replacePipe(string) {
        return string.replace(/\|/g, " | ");
    }

    return item;
}

function isApiMethod(item) {
    return item.module === "BrowserSync";
}

/**
 * Main exported function for preparing view data
 * @param items
 * @returns {*}
 */
function prepareClassitems(items) {
    if (items.length) {
        return items
            .filter(isApiMethod)
            .filter(hasNameFilter)
            .map(addParams)
            .map(addPreview)
            .map(fixParams)
            .sort(sortItems);
    }
    return items;
}

/**
 * Filter options
 * @param item
 * @returns {boolean}
 */
function isOption(item) {
    return item.module === "BrowserSync.options";
}

/**
 * Fix the ghostModeOption
 * @param item
 * @returns {*}
 */
function fixGhostMode(item) {

    if (item.name !== "ghostMode") {
        return item;
    }

    return item;
}

/**
 * @param item
 * @returns {*}
 */
function fixDefaults(item) {
    item.defaultValue = item.default || item.optdefault || null;
    return item;
}

/**
 *
 */
function addSubprops(item) {
    if (_.isUndefined(item.subprops)) {
        item.subprops = null;
    } else {
        item.subprops = item.subprops.map(fixDefaults);
    }
    return item;
}

/**
 * Main exported function for preparing view data
 * @param items
 * @returns {*}
 */
function prepareOptions(items) {
    if (items.length) {
        return items
            .filter(isOption)
            .map(fixGhostMode)
            .map(addSubprops)
            .map(fixParams)
            .map(function (item) {
                if (!item.since) {
                    item.since = false;
                }
                return item;
            })
            .map(fixDefaults);
    }
    return items;
}

module.exports.prepareClassitems = prepareClassitems;
module.exports.prepareOptions = prepareOptions;
module.exports.prepareCommandLineOptions = function (opts) {
    return _.map(opts, function (value, key) {
        return {
            name: key,
            desc: value
        }
    });
};