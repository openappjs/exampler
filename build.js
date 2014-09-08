var fs = require('fs');
var path = require('path');
var swig = require('swig');
var browserify = require('browserify');
var factorBundle = require('factor-bundle');

module.exports = function _exampler_build (options) {

  var examples = require('./lib/dir')(options.dir);

  //
  // js bundles
  //
  
  // get entries
  var entries = [];
  var outputs = [];
  examples.forEach(function (name) {
    entries.push(path.join(options.dir, name, "app.js"));
    outputs.push(path.join(options.dir, name, "bundle.js"));
  });

  var b = browserify({
    debug: true,
    entries: entries,
  });

  b.plugin(factorBundle, {
    o: outputs,
  });

  var commonBundleFile = fs.createWriteStream(path.join(options.dir, "common.js"));
  
  b.bundle().pipe(commonBundleFile);

  //
  // html indexes
  //

  // index templates
  var topIndexTemplate = swig.compileFile(__dirname + '/views/index.swig');
  var exampleIndexTemplate = swig.compileFile(__dirname + '/views/example.swig');

  examples.forEach(function (example) {

    // render top index.html
    var topIndexContent = topIndexTemplate({
      name: options.name,
      examples: examples,
    });
    var topIndexPath = path.join(options.dir, "index.html");
    fs.writeFileSync(topIndexPath, topIndexContent);

    // render example/index.html
    var exampleIndexContent = exampleIndexTemplate({
      name: options.name,
      example: example,
    });
    var exampleIndexPath = path.join(options.dir, example, "index.html");
    fs.writeFileSync(exampleIndexPath, exampleIndexContent);
  });
};
