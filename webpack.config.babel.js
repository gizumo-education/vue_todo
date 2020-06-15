import { VueLoaderPlugin } from 'vue-loader';
import path from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

console.log('nodeEnv ==> ', nodeEnv);
console.log('isDev ==> ', isDev);
console.log(path.resolve(__dirname, 'src/js/components'));

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const config = {
  mode: nodeEnv,
  devtool: isDev ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      TodoDir: `${src}/js/todo`,
      TodoRouterDir: `${src}/js/todoRouter`,
      TodoVuexDir: `${src}/js/todoVuex`,
      VuexSample: `${src}/js/todoVuex_sample`,
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    open: true,
    inline: true,
    hot: true,
    port: 8080,
    contentBase: dist,
    // history APIのフォールバックのサポートを有効にする
    historyApiFallback: true,
  },
  entry: {
    index: `${src}/js/index.js`
  },
  output: {
    filename: 'js/[name].js',
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { failOnError: false }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({ grid: true })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}

export default config;
