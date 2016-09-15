'use strict';

const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV        = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION  = NODE_ENV === 'production';
const ENV_TEST        = NODE_ENV === 'test';
const HOST            = process.env.HOST || 'localhost';
const PORT            = process.env.PORT || 3000;

//=========================================================
//  LOADERS
//---------------------------------------------------------
const loaders = {
  typescript: {
    test: /\.ts$/,
    loader: 'ts',
    exclude: /node_modules/
  },
  componentStyles: {
    test: /\.scss$/,
    loader: 'raw!postcss!sass',
    exclude: path.resolve('src/app/assets/styles')
  },
  sharedStyles: {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass',
    include: path.resolve('src/app/assets/styles')
  },
  productionStyles: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass'),
    include: path.resolve('src/app/assets/styles')
  },
  jsonLoader: {
    test: /\.json$/,
    loader: 'json-loader'
  },
  fileLoader: {
    test: /\.(jpg|png|gif)$/,
    loader: 'file-loader'
  },
  rawLoader: {
    test: /\.(html)$/,
    loader: 'raw-loader',
    exclude: path.resolve('src/index.html')
  }
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

/**
 * Resolve
 * Reference: http://webpack.github.io/docs/configuration.html#resolve
 */
config.resolve = {
  extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html', '.svg'],
  root: path.resolve('.'),
  modulesDirectories: ['node_modules']
};

config.module = {
  loaders: [
    loaders.typescript,
    loaders.componentStyles,
    loaders.jsonLoader,
    loaders.fileLoader,
    loaders.rawLoader
  ]
};

config.plugins = [
  new ForkCheckerPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'process.env.SOUNDCLOUD_CLIENT_ID': JSON.stringify(process.env.SOUNDCLOUD_CLIENT_ID)
  }),
  new CopyWebpackPlugin([
    { from: 'src/app/assets/images', to: 'assets'   },
  ])
];

config.postcss = [
  autoprefixer({ browser: ['last 3 versions'] })
];

config.sassLoader = {
  includePath: ['src/app/assets'],
  outputStyle: 'compressed',
  prevision: 10,
  sourceComments: false
};


//=========================================================
//  COMMON DEVELOPMENT/PRODUCTION
//---------------------------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: ['./src/main.ts'],
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./public'),
    publicPath: '/'
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      chunkSortMeta: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}

//=========================================================
//  DEVELOPMENT ONLY
//---------------------------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.main.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);

  config.module.loaders.push(loaders.sharedStyles);

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=========================================================
//  PRODUCTION ONLY
//---------------------------------------------------------
if (ENV_PRODUCTION) {
  config.debug = false;

  config.devtool = 'source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module.loaders.push(loaders.productionStyles);

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      },
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      comments: false
    })
  );
}

//=========================================================
//  Test 
//---------------------------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.loaders.push(loaders.sharedStyles);

  if (argv.coverage) {
    config.module.postLoaders = [{
      test: /\.ts$/,
      loader: 'istanbul-instrumenter-loader',
      include: path.resolve('src'),
      exclude: [
        /\.spec\.ts$/,
        /node_modules/
      ]
    }];
  }
}
