const nodeExternals = require('webpack-node-externals');
const tsConfig = require('./tsconfig.json');
const path = require('path');

const paths = tsConfig.compilerOptions.paths;
const srcDir = `${__dirname}/src`;

const devStage = 'development';
const stage = process.env.NODE_ENV || devStage;

let alias = {};

for (const key of Object.keys(paths)) {
  const module = key.replace('@', '').replace('*', '');
  alias[key.replace('/*', '')] = path.resolve(srcDir, module);
}

module.exports = {
  target: 'node',
  entry: './src/index.ts',
  devtool: stage === devStage ? 'eval-cheap-module-source-map' : 'none',
  mode: stage,
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    alias,
    symlinks: false,
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  externals: [nodeExternals()], 
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
};

