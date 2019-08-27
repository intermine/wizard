const path = require('path');

module.exports = {
  entry: './public/js/client.js',
  mode : 'development',
  devtool: 'inline-source-map',
  output: {
    library: 'wizard',
    libraryExport : 'default',
    libraryTarget : 'var',
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist')
  }
};
