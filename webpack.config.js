const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");



module.exports = {
  entry: './appjs/app.js',
  devtool: 'source-map',
  output: {
    filename: 'appbuild.js',
    path: __dirname + '/appjs/',
    publicPath: '/app/'
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.(js|html)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ],
  module: {
    
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      { 
        test: /\.js$/, 
        loader: "babel-loader",
        exclude: /node_modules/
        
      }

    ],

  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }

}
