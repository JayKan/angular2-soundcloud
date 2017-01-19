'use strict';

require('core-js/es6/array');
require('core-js/es6/map');
require('core-js/es6/set');
require('core-js/es6/string');
require('core-js/es6/symbol');
require('core-js/es7/reflect');
require('core-js/fn/array/includes');
require('core-js/fn/object/assign');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

require('ts-helpers');

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

const browser = require('@angular/platform-browser-dynamic/testing');
const testing = require('@angular/core/testing');

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

// Load source files
const context = require.context('./src', true, /\.spec\.ts/);
const exclude = [
  './main.ts',
  './polyfills.ts',
  './vendor.ts'
];

// context.keys().forEach(function(key) {
//   if (exclude.indexOf(key) === -1) context(key);
// });
context.keys().forEach(context);