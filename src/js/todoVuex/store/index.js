import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    todos: [],
    todoFilter: '',
    targetTodo: {
      id: null,
      title: '',
      detail: '',
      completed: '',
    },
    errorMessage: 'エラーが起きました。',
    emptyMessage: 'やることリストは空です。',
  },
  getters: {
    completedTodos: function(state) {
      return state.todos.filter((todo) => {
        return todo.completed;
      })
    },
    incompleteTodos: function(state) {
      return state.todos.filter((todo) => {
        return !todo.completed;
      })
    },
    completedTodosLength: function(state, getters) {
      return getters.completedTodos.length;
    },
    incompleteTodosLength: function(state, getters) {
      return getters.incompleteTodos.length;
    },
  },
  mutations: {
    setTodoFilter: function(state, routeName) {
      state.todoFilter = routeName;
    },
    setEmptyMessage: function(state, routeName) {
      if (routeName === 'completedTodos') {
        let emptyMessage = '完了済みのやることリストはありません。';
      } else if (routeName === 'incompleteTodos') {
        let emptyMessage = '未完了のやることリストはありません。';
      } else {
        let emptyMessage = 'やることリストには何も登録されていません。';
      }
    },
    initTargetTodo: function(state) {
      state.targetTodo = {
        id: null,
        title: '',
        detail: '',
        completed: false,
      };
    },
    hideError: function(state) {
      state.errorMessage = 'エラーが起きました。';
    },
    showError: function(state, payload) {
      if (payload) {
        const errorMessage = payload.data;
      } else {
        state.errorMessage = 'ネットに接続がされていない、もしくはサーバーとの接続がされていません。ご確認ください。';
      }
    },
    updateTargetTodo(state, { name, value }) {
      state.targetTodo[name] = value;
    },
    getTodos: function(state, payload) {
      state.todos = payload.reverse();
    },
    addTodo: function(state, payload) {
      state.todos.unshift(payload);
    },
    showEditor: function(state, payload) {
      state.targetTodo = Object.assign({}, payload);
    },
    editTodo: function(state, payload) {
      state.todos = state.todos.map((todoItem) => {
        if (todoItem.id === payload.id) return payload;
        return todoItem;
      });
    },
  },
  actions: {
    setTodoFilter: function({ commit }, routeName) {
      commit('setTodoFilter', routeName);
    },
    setEmptyMessage: function({ commit }, routeName) {
      commit('setEmptyMessage', routeName);
    },
    updateTargetTodo({ commit }, { name, value }) {
      commit('updateTargetTodo', { name, value });
    },
    getTodos: function({ commit }) {
      axios.get('http://localhost:3000/api/todos/').then(function({ data }) {
        commit('getTodos', data.todos);
      }).catch(function(err) {
        commit('showError', err.response);
      });
    },
    addTodo: function({ commit, state }) {
      if (!state.targetTodo.title || !state.targetTodo.detail) {
        commit({
          type: 'showError',
          data: 'タイトルと内容はどちらも必須項目です。',
        });
        return;
      }
      const postTodo = Object.assign({}, {
        title: state.targetTodo.title,
        detail: state.targetTodo.detail,
      });
      axios.post('http://localhost:3000/api/todos/', postTodo).then(function({ data }) {
        commit('addTodo', data);
      }).catch(function(err) {
        commit('showError', err.response);
      });
      commit('initTargetTodo');
    },
    changeCompleted: function({ commit }, payload) {
      const targetTodo = Object.assign({}, payload);
      axios.patch(`http://localhost:3000/api/todos/${targetTodo.id}`, {
        completed: !targetTodo.completed,
      }).then(function({ data }) {
        commit('editTodo', data);
      }).catch(function(err) {
        commit('showError', err.response);
      });
      commit('initTargetTodo');
    },
    showEditor: function({ commit }, payload) {
      commit('showEditor', payload);
    },
    editTodo: function({ commit, state }) {
      const targetTodo = state.todos.find(todo => todo.id === state.targetTodo.id);
      if (
        targetTodo.title === state.targetTodo.title
        && targetTodo.detail === state.targetTodo.detail
      ) {
        commit('initTargetTodo');
        return;
      }
      axios.patch(`http://localhost:3000/api/todos/${state.targetTodo.id}`, {
        title: state.targetTodo.title,
        detail: state.targetTodo.detail,
      }).then(function({ data }) {
        commit('editTodo', data);
      }).catch(function(err) {
        commit('showError', err.response);
      });
      commit('initTargetTodo');
    },
    deleteTodo: function({ commit }, payload) {
      axios.delete(`http://localhost:3000/api/todos/${payload}`).then(function({ data }) {
        // 処理
      }).catch(function(err) {
        // 処理
      });
      // 必要があれば処理
    },
  },
});

export default store;
