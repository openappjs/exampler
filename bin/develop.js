#!/usr/bin/env node

var exampler = require('../develop');

var options = require('../lib/argv')({
  'p': {
    alias: "port",
    description: "server port",
    default: 5000,
  }
});

var app = exampler(options);

app.listen(options.port);
