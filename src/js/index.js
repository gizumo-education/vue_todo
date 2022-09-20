import Vue from 'vue';
// import VueRouter from 'vue-router';

// import routes from 'TodoRouterDir/routes';
// import routes from 'TodoVuexDir/routes';
// import store from 'TodoVuexDir/store';
// import routes from 'VuexSample/routes';
// import store from 'VuexSample/store';

import '../scss/global.scss';

import myApp from './first/index.vue';
// import myApp from 'TodoDir/index.vue';
// import myApp from 'TodoRouterDir/index.vue';
// import myApp from 'TodoVuexDir/index.vue';
// import myApp from 'VuexSample/index.vue';

// Vue.use(VueRouter);
// const router = new VueRouter({
//   routes,
//   mode: 'history',
// });

new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
});
