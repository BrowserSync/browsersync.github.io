var fs = require('fs');

module.exports = function (opts, ctx, done) {
    var m    = require('../manifest');
    // var
    var path = require('path');
    var allowed = ['.html', '.css', '.js', '.svg', '.png', '.jpg', '.gif'];
    var excludedDir = ['img/svg', 'index.src'];
    var excludedFiles = ['urls.json', '.DS_Store'];
    var sw = fs.readFileSync('sw-template.js', 'utf8');

    var tree = walk(m['public-html'].tree, [])
        .concat(walk(m['public'].tree, []))
        .map(path.parse)
        .filter(x => {
            if (excludedDir.indexOf(x.dir) > -1) return false;
            return true;
        })
        .filter(x => {
            if (excludedFiles.indexOf(x.base) > -1) return false;
            if (excludedFiles.indexOf(x.name) > -1) return false;
            return true;
        })
        .filter(x => {
            if (x.ext === '.html') {
                if (x.base !== 'index.html') return false;
            }
            return true;
        })
        .map(x => {
            if (x.ext === '.html') return '/' + x.dir;
            return path.join('/', x.dir, x.base);
        }).concat(
            "https://fonts.gstatic.com/s/titilliumweb/v4/7XUFZ5tgS-tD6QamInJTceHuglUR2dhBxWD-q_ehMME.woff2",
            "https://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wpr8hG3LOB74UqS1hPmWaAxzQ.woff2",
            "https://fonts.gstatic.com/s/titilliumweb/v4/r9OmwyQxrgzUAhaLET_KO04Sq3N3sm-tF9FpL8sHob4.woff2",
            "https://fonts.googleapis.com/css?family=Titillium+Web:400,400italic,700"
        );

    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');

    hash.on('readable', () => {
        var data = hash.read();
        if (data) {
            writeTemplate(tree, data.toString('hex'));
            done();
        }
    });

    hash.write(m['public-html'].hash);
    hash.write(m['public'].hash);
    hash.end();


    function writeTemplate(files, cache) {

        fs.writeFileSync('sw.js',
            sw
                .replace(/\/\*\* cache-paths \*\*\//, `var files = ${JSON.stringify(files, null, 4)};`)
                .replace(/\/\*\* cache \*\*\//, cache)
        );
    }
    function walk(m, initial) {
        initial = initial || [];
        return m.reduce(function (acc, item) {
            if (item.tree && item.tree.length) {
                return acc.concat(walk(item.tree))
            }
            return acc.concat(item.path);
        }, initial);
    }
};
