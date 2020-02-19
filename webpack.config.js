const path = require('path');
const sections = require('./sections');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[contentHash].js'
  },
  devServer: {
    index: `${sections[sections.length-1]}.html`,
    filename: `js/${sections[sections.length-1]}.js`
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env' 
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};

sections.forEach(section => {
  module.exports.entry[section] = `./src/js/${section}.js`;
  module.exports.plugins.push(new HTMLWebpackPlugin({
    title: section,
    filename: `${section}.html`,
    template: `./src/${section}.html`,
    chunks: [section]
  }));
});
