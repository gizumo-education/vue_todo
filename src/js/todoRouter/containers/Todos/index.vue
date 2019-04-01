<template lang="html">
  <app-wrapper :todos="todos">
    <app-navi />
    <app-register
      v-if="todoFilter !== 'completedTodo'"
      :todo-id="targetTodo.id"
      :todo-title.sync="targetTodo.title"
      :todo-detail.sync="targetTodo.detail"
      :todo-rows="rows"
      @addTodo="addTodo"
      @editTodo="editTodo"
    />
    <!--
      :title="targetTodo.title"
      @update:title="targetTodo.title = $event"

      :detail="targetTodo.detail"
      @update:detail="targetTodo.detail = $event"

      :props名="dataの値" => 子へ渡すprops
      @update:props名="dataの値 = 上の「propsに指定したい値」" => 子のイベント購読
    -->
    <app-error-message
      v-if="errorMessage"
      :error-message="errorMessage"
    />
    <template v-slot:todos>
      <app-list
        v-if="filteredTodos.length"
        :todos="filteredTodos"
        @changeCompleted="changeCompleted"
        @showEditor="showEditor"
        @deleteTodo="deleteTodo"
      />
      <app-empty-message
        v-else
        :empty-message="emptyMessage"
      />
    </template>
  </app-wrapper>
</template>

<script>
import axios from 'axios';

import Wrapper from 'TodoRouterDir/components/Wrapper';
import Navi from 'TodoRouterDir/components/Navi';
import { ErrorMessage, EmptyMessage } from 'TodoRouterDir/components/Message';
import Register from 'TodoRouterDir/components/Register';
import List from 'TodoRouterDir/components/List';

export default {
  components: {
    appWrapper: Wrapper,
    appNavi: Navi,
    appErrorMessage: ErrorMessage,
    appEmptyMessage: EmptyMessage,
    appList: List,
    appRegister: Register,
  },
  data() {
    return {
      todos: [],
      todoFilter: '',
      filteredTodos: [],
      targetTodo: {
        id: null,
        title: '',
        detail: '',
        completed: '',
      },
      errorMessage: '',
      emptyMessage: '',
    };
  },
  computed: {
    rows() {
      const num = this.targetTodo.detail.split('\n').length;
      return (num > 3) ? num : 3;
    },
  },
  watch: {
    $route() {
      this.setFilter();
    },
    todos() {
      this.setFilter();
    },
  },
  created() {
    axios.get('http://localhost:3000/api/todos/').then(({ data }) => {
      this.todos = data.todos.reverse();
      this.setFilter();
    }).catch((err) => {
      this.showError(err);
      this.setFilter();
    });
  },
  methods: {
    setFilter() {
      const routeName = this.$route.name;
      this.todoFilter = routeName;
      if (routeName === 'completedTodo') {
        this.filteredTodos = this.todos.filter(todo => todo.completed);
      } else if (routeName === 'incompleteTodo') {
        this.filteredTodos = this.todos.filter(todo => !todo.completed);
      } else {
        this.filteredTodos = this.todos;
      }
      this.setEmptyMessage();
    },
    setEmptyMessage() {
      const { filteredTodos } = this;
      if (filteredTodos.length) {
        this.emptyMessage = '';
      } else if (this.todoFilter === 'completedTodo') {
        this.emptyMessage = '完了済みのやることリストはありません。';
      } else if (this.todoFilter === 'incompleteTodo') {
        this.emptyMessage = '未完了のやることリストはありません。';
      } else {
        this.emptyMessage = 'やることリストには何も登録されていません。';
      }
    },
    initTargetTodo() {
      return {
        id: null,
        title: '',
        detail: '',
        completed: false,
      };
    },
    hideError() {
      this.errorMessage = '';
    },
    showError(err) {
      if (err.response) {
        this.errorMessage = err.response.data.message;
      } else {
        this.errorMessage = 'ネットに接続がされていない、もしくはサーバーとの接続がされていません。ご確認ください。';
      }
    },
    addTodo() {
      if (!this.targetTodo.title || !this.targetTodo.detail) {
        this.errorMessage = 'タイトルと内容はどちらも必須項目です。';
        return;
      }
      const postTodo = Object.assign({}, {
        title: this.targetTodo.title,
        detail: this.targetTodo.detail,
      });
      axios.post('http://localhost:3000/api/todos/', postTodo).then(({ data }) => {
        this.todos.unshift(data);
        this.targetTodo = this.initTargetTodo();
        this.hideError();
      }).catch((err) => {
        this.showError(err);
      });
    },
    changeCompleted(todo) {
      this.targetTodo = this.initTargetTodo();
      const targetTodo = Object.assign({}, todo);
      axios.patch(`http://localhost:3000/api/todos/${targetTodo.id}`, {
        completed: !targetTodo.completed,
      }).then(({ data }) => {
        this.todos = this.todos.map((todoItem) => {
          if (todoItem.id === targetTodo.id) return data;
          return todoItem;
        });
        this.hideError();
      }).catch((err) => {
        this.showError(err);
      });
    },
    showEditor(todo) {
      this.targetTodo = Object.assign({}, todo);
    },
    editTodo() {
      const targetTodo = this.todos.find(todo => todo.id === this.targetTodo.id);
      if (
        targetTodo.title === this.targetTodo.title
        && targetTodo.detail === this.targetTodo.detail
      ) {
        this.targetTodo = this.initTargetTodo();
        return;
      }
      axios.patch(`http://localhost:3000/api/todos/${this.targetTodo.id}`, {
        title: this.targetTodo.title,
        detail: this.targetTodo.detail,
      }).then(({ data }) => {
        this.todos = this.todos.map((todo) => {
          if (todo.id === this.targetTodo.id) return data;
          return todo;
        });
        this.targetTodo = this.initTargetTodo();
        this.hideError();
      }).catch((err) => {
        this.showError(err);
      });
    },
    deleteTodo(id) {
      this.targetTodo = this.initTargetTodo();
      axios.delete(`http://localhost:3000/api/todos/${id}`).then(({ data }) => {
        this.todos = data.todos.reverse();
        this.hideError();
      }).catch((err) => {
        this.showError(err);
      });
    },
  },
};
</script>
