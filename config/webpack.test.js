'use strict';

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.NODE_ENV = 'test';
const helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
  },

  module: {
    preLoaders: [
      /**
       * Source map loader support for *.js files
       * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]}
    ],

    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: [/\.e2e\.ts$/] },
      { test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('src/index.html')] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: [helpers.root('src/index.html')] },
      { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] }
    ],

    postLoaders: [
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
  ],
};


