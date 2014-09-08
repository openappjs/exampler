#!/usr/bin/env node

var exampler = require('../publish');

var options = require('../lib/argv')({});

exampler(options);
