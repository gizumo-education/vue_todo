import Vue from 'vue';
// import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';
// import store from 'TodoRouterDir/store';

import '../scss/global.scss';

import myApp from './first';
// import myApp from 'TodoDir';
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
  // store,
});
