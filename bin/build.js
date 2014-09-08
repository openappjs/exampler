#!/usr/bin/env node

var exampler = require('../build');

var options = require('../lib/argv')({});

exampler(options);
