# Vue Todo Lesson

## セットアップ

クローンしたら下記コマンドで、パッケージのインストールをする。

```
npm i
```

インストールしたら、下記コマンドで**クライアント側のソースコードのビルド**と**API用のサーバーの立ち上げ**をする。  
コマンドは別タブで実行する。

```
# クライアント側のソースコードのビルド
npm run dev:watch
```

```
# API用のサーバーの立ち上げ
npm run dev:server
```

## Vue Todo (No routing)

Todoの確認には、下記のようにファイルの変更をしましょう。  
ただ、こちらはカリキュラムを通して完成させてもらうものなので、正常には動きません。

```javascript
import Vue from 'vue';
// import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';

import '../scss/global.scss';

// import myApp from './first';
import myApp from 'TodoDir';
// import myApp from 'TodoRouterDir';

// Vue.use(VueRouter);
// const router = new VueRouter({
//   routes,
//   mode: 'history',
// });

new Vue({
  el: '#app',
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }

  // router,
});

```


## Vue Todo with vue-router

vue-routerを使ったTodoの確認には、下記のようにファイルの変更をしましょう。

### `src/js/index.js`

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from 'TodoRouterDir/routes';

import '../scss/global.scss';

// import myApp from './first';
// import myApp from 'TodoDir';
import myApp from 'TodoRouterDir';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }

  router,
});
```

### `webpack.config.babel.js`

33行目の`// historyApiFallback: true,`のコメント外す
