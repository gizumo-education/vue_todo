import Vue from 'vue';

import '../scss/global.scss';

import myApp from 'Components/test';
// import myApp from 'Components/Todo';

new Vue({
  el: '#app',
  render: h => h(myApp),
  // render: h => h(myApp), は↓の書き方を短くしたもの
  // render: function (createElement) {
  //   return createElement(myApp)
  // }
});
