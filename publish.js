var ghpages = require('gh-pages');

module.exports = function _exampler_publish (options) {
  ghpages.publish(options.in, function (err) {
    if (err) { throw err; }
    console.log("published to gh-pages");
  });
};
