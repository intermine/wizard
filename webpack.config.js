const path = require('path');

module.exports = {
  entry: './public/js/client.js',
  mode : 'development',
  devtool: 'inline-source-map',
  module:{
    rules:  [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|dist)/,
        use: ['babel-loader'],
      }
    ]
  },
  resolve: {
    extensions: ["js"]
  },
  output: {
    library: 'wizard',
    libraryExport : 'default',
    libraryTarget : 'var',
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist')
  }
};
