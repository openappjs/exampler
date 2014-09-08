var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var swig = require('swig');
var browserify = require('browserify');
var factorBundle = require('factor-bundle');
var series = require('run-series');

module.exports = function _exampler_build (options, cb) {

  options.examples = require('./lib/dir')(options.dir);

  series([
    function (callback) {
      fse.copy(options.dir, options.out, callback);
    },
    function (callback) {
      writeBundles(options, callback);
    },
    function (callback) {
      writeIndexes(options, callback);
    },
  ], cb)

};

//
// js bundles
//
function writeBundles (options, callback) {
  // get entries
  var entries = [];
  var outputs = [];
  options.examples.forEach(function (name) {
    entries.push(path.join(options.dir, name, "index.js"));
    outputs.push(path.join(options.out, name, "bundle.js"));
  });

  var b = browserify({
    debug: true,
    entries: entries,
  });

  b.plugin(factorBundle, {
    o: outputs,
  });

  var commonBundleFile = fs.createWriteStream(path.join(options.out, "common.js"));

  b.bundle().pipe(commonBundleFile)
  .on('error', callback)
  .on('close', function () { callback(); })
  ;
}

//
// html indexes
//
function writeIndexes (options, callback) {

  // index templates
  var topIndexTemplate = swig.compileFile(__dirname + '/views/index.swig');
  var exampleIndexTemplate = swig.compileFile(__dirname + '/views/example.swig');

  options.examples.forEach(function (example) {

    // render top index.html
    var topIndexContent = topIndexTemplate({
      name: options.name,
      examples: options.examples,
    });
    var topIndexPath = path.join(options.out, "index.html");
    fs.writeFileSync(topIndexPath, topIndexContent);

    // render example/index.html
    var exampleIndexContent = exampleIndexTemplate({
      name: options.name,
      example: example,
    });
    var exampleIndexPath = path.join(options.out, example, "index.html");
    fs.writeFileSync(exampleIndexPath, exampleIndexContent);
  });

  process.nextTick(callback);
};
