'use strict';

const argv = require('yargs').argv;

module.exports = config => {
  const options = {
    basePath: '',

    frameworks: ['jasmine'],

    files: ['karma.entry.js'],

    preprocessors: {
      'karma.entry.js': ['coverage', 'webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    },

    // reporters: ['dots'],
    reporters: ['mocha'],

    logLevel: config.LOG_INFO,

    colors: true,

    autoWatch: true,

    singleRun: false,

    browsers: ['Chrome']
  };

  if (argv.coverage) {
    options.reporters.push('coverage');
    options.coverageReporter = {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    };
  }

  config.set(options);
};
