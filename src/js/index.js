import Vue from 'vue';
import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';
import routes from 'TodoVuexDir/routes';
import store from 'TodoVuexDir/store';
// import routes from 'VuexSample/routes';
// import store from 'VuexSample/store';

import '../scss/global.scss';

// import myApp from './first';
// import myApp from 'TodoDir';
// import myApp from 'TodoRouterDir';
import myApp from 'TodoVuexDir';
// import myApp from 'VuexSample';

// ↓ここでVueRouterの登録をしている
Vue.use(VueRouter);
// ルーターインスタンスを生成
const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
  // renderはHTMLをビルドする描画用の関数
  // componentsに登録せずコンポーネントを使える
  // 別ファイルの定数をそのまま使える
  // イベントなどをすべて定数にする
  // render propで<div>を挟まない
});
