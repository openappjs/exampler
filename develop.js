var fs = require('fs');
var path = require('path');
var beefy = require('beefy');
var swig = require('swig');
var express = require('express');

module.exports = function _exampler_develop (options) {

  var examples = fs.readdirSync(options.dir)
  .filter(function (name) {
    // example directories are all except names ending in .swig
    return (name.substring(name.length - 5, name.length) !== '.swig');
  })
  ;

  var app = express();

  //
  // html indexes
  //

  // setup template rendering
  app.engine('swig', swig.renderFile);
  app.set('view engine', 'swig');
  app.set('views', __dirname + '/views');

  app.get('/', function (req, res) {
    res.render('index.swig', {
      name: options.name,
      examples: examples,
    });
  })

  //
  // js bundles
  //

  // get entries
  var entries = {};
  examples.forEach(function (name) {
    entries[path.join('/examples', name, 'bundle.js')] =
      path.join(options.dir, name, "app.js");
  });
  // use beefy as live bundler
  app.use(beefy({
    cwd: options.dir,
    entries: entries,
    debug: true,
    live: true,
  }));

  return app;
};
