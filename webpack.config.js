module.exports = {
  entry: './appjs/app.js',

  output: {
    filename: 'appbuild.js',
    path: __dirname + '/appjs/',
    publicPath: '/app/'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
