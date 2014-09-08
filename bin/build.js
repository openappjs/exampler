#!/usr/bin/env node

var path = require('path');

var exampler = require('../build');

var options = require('../lib/argv')({
  'o': {
    alias: "out",
    description: "build output directory",
    default: path.join(process.cwd(), ".examples"),
  },
});

exampler(options, function (err) {
  if (err) { throw err; }
  console.log("built examples from", options.dir, "to", options.out);
});
