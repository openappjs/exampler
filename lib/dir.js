var fs = require('fs');

module.exports = function _exampler_dir (dir) {

  return fs.readdirSync(dir)
  .filter(function (name) {
    // example directories are all except names ending in .html or .js
    return (name.substring(name.length - 5, name.length) !== '.html') &&
      (name.substring(name.length - 3, name.length) !== '.js')
    ;
  })
  ;
};
