var yargs = require('yargs');
var path = require('path');

module.exports = function _exampler_argv (options) {

  // common options
  var parser = yargs
  .usage("usage: $0 -n [name] -d [examples dir]")
  .options('n', {
    string: true,
    alias: 'name',
    description: "name of module",
    default: require(path.join(process.cwd(), "package.json")).name,
  })
  .options('d', {
    string: true,
    alias: 'dir',
    description: "directory containing examples",
    default: "examples",
  })
  ;

  // additional options
  if (typeof options === 'object') {
    for (var key in options) {
      parser = parser.options(key, options[key]);
    }
  }

  var options = parser.argv;

  // if not absolute path
  if (options.dir[0] !== '/') {
    // prefix with cwd
    options.dir = options.d = path.join(process.cwd(), options.dir);
  }

  return options;
};
