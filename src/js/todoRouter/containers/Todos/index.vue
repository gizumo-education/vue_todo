<template>
  <app-wrapper :todos="todos">
    <app-navi />
    <app-register
      v-if="todoFilter !== 'completedTodos'"
      :todo-id="targetTodo.id"
      :todo-title.sync="targetTodo.title"
      :todo-detail.sync="targetTodo.detail"
      :todo-rows="rows"
      @add-todo="addTodo"
      @edit-todo="editTodo"
    />
    <!--
      :todo-title="targetTodo.title"
      @update:todoTitle="targetTodo.title = $event"

      :todo-detail="targetTodo.detail"
      @update:todoDetail="targetTodo.detail = $event"

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
        @change-completed="changeCompleted"
        @show-editor="showEditor"
        @delete-todo="deleteTodo"
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

import Wrapper from 'TodoRouterDir/components/Wrapper/index.vue';
import Navi from 'TodoRouterDir/components/Navi/index.vue';
import { ErrorMessage, EmptyMessage } from 'TodoRouterDir/components/Message';
import Register from 'TodoRouterDir/components/Register/index.vue';
import List from 'TodoRouterDir/components/List/index.vue';

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
    }).catch(err => {
      this.showError(err);
      this.setFilter();
    });
  },
  methods: {
    setFilter() {
      const routeName = this.$route.name;
      this.todoFilter = routeName;
      if (routeName === 'completedTodos') {
        this.filteredTodos = this.todos.filter(todo => todo.completed);
      } else if (routeName === 'incompleteTodos') {
        this.filteredTodos = this.todos.filter(todo => !todo.completed);
      } else {
        this.filteredTodos = this.todos;
      }

      if (!this.filteredTodos.length) this.setEmptyMessage();
    },
    setEmptyMessage() {
      if (this.todoFilter === 'completedTodo') {
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
      const postTodo = {
        title: this.targetTodo.title,
        detail: this.targetTodo.detail,
      };
      axios.post('http://localhost:3000/api/todos/', postTodo).then(({ data }) => {
        this.todos.unshift(data);
        this.targetTodo = this.initTargetTodo();
        this.hideError();
      }).catch(err => {
        this.showError(err);
      });
    },
    changeCompleted(todo) {
      this.targetTodo = this.initTargetTodo();
      const targetTodo = { ...todo };
      axios.patch(`http://localhost:3000/api/todos/${targetTodo.id}`, {
        completed: !targetTodo.completed,
      }).then(({ data }) => {
        this.todos = this.todos.map(todoItem => {
          if (todoItem.id === targetTodo.id) return data;
          return todoItem;
        });
        this.hideError();
      }).catch(err => {
        this.showError(err);
      });
    },
    showEditor(todo) {
      this.targetTodo = { ...todo };
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
        this.todos = this.todos.map(todo => {
          if (todo.id === this.targetTodo.id) return data;
          return todo;
        });
        this.targetTodo = this.initTargetTodo();
        this.hideError();
      }).catch(err => {
        this.showError(err);
      });
    },
    deleteTodo(id) {
      this.targetTodo = this.initTargetTodo();
      axios.delete(`http://localhost:3000/api/todos/${id}`).then(({ data }) => {
        this.todos = data.todos.reverse();
        this.hideError();
      }).catch(err => {
        this.showError(err);
      });
    },
  },
};
</script>
