'use strict';

module.exports = config => {
  const testWebpackConfig = require('./webpack.test.js');
  const configuration = {

    basePath: '',

    frameworks: ['jasmine'],

    exclude: [],

    files: ['./spec-bundle.js'],

    preprocessors: {
      './spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },


    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    webpackServer: { noInfo: true },

    reporters: ['mocha', 'coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
      'Chrome'
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true
  };

  config.set(configuration);
};