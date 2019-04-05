# Vue Todo Lesson

## サンプル

<a href="https://gizumo-inc.github.io/vue_todo/sample/" target="_blank">https://gizumo-inc.github.io/vue_todo/sample/</a>

※ サンプルは、下の「API用のサーバーの立ち上げ」をしないと正常に動きません。

## セットアップ

クローンしたら下記コマンドで、パッケージのインストールをします。

```
npm i
```

インストールしたら、下記コマンドで**クライアント側のソースコードのビルド**と**API用のサーバーの立ち上げ**をします。  
コマンドは別タブで実行する必要があります。

```
# クライアント側のソースコードのビルド
npm run dev:watch
```

```
# API用のサーバーの立ち上げ
npm run dev:server
```

## Vue Todo (初期状態)

クローンしたての状態では、下記テキストが表示されます。

```
Welcome to Vue Todo Lesson!!

This is Lesson for Beginner of Frontend Engineer.
```

## Vue Todo (No Routing)

Todoの確認には、下記のようにファイルの変更をします。  
ただ、こちらはカリキュラムを通して完成させてもらうものなので、正常には動きません。

### `src/js/index.js`

```javascript
import Vue from 'vue';
// import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';
// import routes from 'TodoVuexDir/routes';
// import store from 'TodoVuexDir/store';
// import routes from 'VuexSample/routes';
// import store from 'VuexSample/store';

import '../scss/global.scss';

// import myApp from './first';
import myApp from 'TodoDir';
// import myApp from 'TodoRouterDir';
// import myApp from 'TodoVuexDir';
// import myApp from 'VuexSample';

// Vue.use(VueRouter);
// const router = new VueRouter({
//   routes: routes,
//   mode: 'history',
// });

new Vue({
  el: '#app',
  // router: router,
  // store: store,
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
});

```


## Vue Todo with vue-router

vue-routerを使ったTodoの確認には、下記のようにファイルの変更をします。

### `src/js/index.js`

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from 'TodoRouterDir/routes';
// import routes from 'TodoVuexDir/routes';
// import store from 'TodoVuexDir/store';
// import routes from 'VuexSample/routes';
// import store from 'VuexSample/store';

import '../scss/global.scss';

// import myApp from './first';
// import myApp from 'TodoDir';
import myApp from 'TodoRouterDir';
// import myApp from 'TodoVuexDir';
// import myApp from 'VuexSample';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
});

```

### `webpack.config.babel.js`

33行目の`// historyApiFallback: true,`のコメントを外します。

## ESlintの有効化

設定ファイルは`./.eslintrc`になります。

### `webpack.config.babel.js`

44~50行目の下記のコメントを外します。

```javascript
// {
//   test: /\.(jsx?|vue)$/,
//   enforce: 'pre',
//   exclude: /node_modules/,
//   loader: 'eslint-loader',
//   options: { failOnError: false }
// },
```

## APIの仕様

### TODOの全件取得
### TODOの1件取得
### TODOの変更
### TODOの削除（論理削除）
### TODOの削除（物理削除）
