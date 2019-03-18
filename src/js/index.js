import Vue from 'vue';

import '../scss/global.scss';

// import myApp from 'Components/test';
import myApp from 'Components/todo/';
// import myApp from 'Components/todo_router/Pages/Todos';

new Vue({
  el: '#app',
  render: h => h(myApp),
});
