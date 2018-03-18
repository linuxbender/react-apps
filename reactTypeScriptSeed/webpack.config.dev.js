const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry: {
    app: path.resolve(__dirname, 'src/bootstrap.tsx'),
    vendor: path.resolve(__dirname, 'src/vendor.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: 'localhost',
    port: 3000,
    noInfo: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
