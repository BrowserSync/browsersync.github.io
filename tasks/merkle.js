var merkle = require('merkle-dir');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

module.exports = function (opts, ctx, done) {

    var existing = JSON.parse(fs.readFileSync(path.resolve('manifest.json'), 'utf8'));

    merkle(opts.dir, function (err, tree) {
        if (!existing[opts.dir]) {
            existing[opts.dir] = {};
        }
        if (existing[opts.dir].hash !== tree.hash) {
            existing[opts.dir].path = opts.dir;
            existing[opts.dir].hash = tree.hash;
            existing[opts.dir].tree = tree.tree;
            existing[opts.dir].date = moment().format('MMMM Do YYYY, h:mm:ss a');
            write(existing);
            console.log('merkle: Writing new manifest.json');
        } else {
            console.log('merkle: No changes detected');
        }
        done();
    });

    function write (json) {
        fs.writeFileSync('manifest.json', JSON.stringify(json, null, 2));
    }
};
