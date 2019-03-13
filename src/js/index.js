import Vue from 'vue';

import '../scss/global.scss';

import myApp from 'Components/test';
// import myApp from 'Components/todo/';
// import myApp from 'Components/todo_router/Pages/Todos';

new Vue({
  el: '#app',
  //////////////////////////////
  // // importしたオブジェクトを渡す
  // // この方法はJITコンパイルにしか対応してない
  // components: {
  //   'root-cmp': App
  // },
  // template: `<root-cmp />`,
  //////////////////////////////

  ////////////////////////////// 下記でも同じ
  render: h => h(myApp)
  //////////////////////////////
});