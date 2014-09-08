#!/usr/bin/env node

var path = require('path');
var yargs = require('yargs');

var exampler = require('../publish');

var options = yargs
.usage("usage: $0 -n [name] -d [examples dir]")
.options('i', {
  string: true,
  alias: 'in',
  description: "input directory containing built examples",
  default: ".examples",
})
.argv
;

// if not absolute path
if (options.in[0] !== '/') {
  // prefix with cwd
  options.i = options.in = path.join(process.cwd(), options.in);
}
;

exampler(options);
