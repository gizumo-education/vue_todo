<template lang="html">
  <app-wrapper>
    <app-nav />
    <app-register v-if="todoFilter !== 'completedTodos'" />
    <app-error-message v-show="errorMessage" />
    <template v-slot:todos>
      <app-list v-if="todos.length" :todos="todos" />
      <app-empty-message />
    </template>
  </app-wrapper>
</template>

<script>
import Wrapper from 'TodoVuexDir/components/Wrapper';
import { ErrorMessage, EmptyMessage } from 'TodoVuexDir/components/Message';
import Register from 'TodoVuexDir/components/Register';
import List from 'TodoVuexDir/components/List';
import Nav from 'TodoVuexDir/components/Navi';

export default {
  components: {
    appWrapper: Wrapper,
    appNav: Nav,
    appErrorMessage: ErrorMessage,
    appEmptyMessage: EmptyMessage,
    appList: List,
    appRegister: Register,
  },
  computed: {
    todoFilter: function() {
      return this.$store.state.todoFilter;
    },
    todos: function() {
      if (this.todoFilter === 'allTodos') {
        return this.$store.state.todos;
      }
      return this.$store.getters[this.todoFilter];
    },
    errorMessage: function() {
      return this.$store.state.errorMessage;
    },
  },
  watch: {
    todos: function(todos) {
      this.$store.dispatch('hideError');
      if (!todos.length) this.$store.dispatch('setEmptyMessage', this.todoFilter);
    },
    $route: function(to) {
      this.$store.dispatch('setTodoFilter', to.name);
    },
  },
  created: function() {
    this.$store.dispatch('getTodos');
    this.$store.dispatch('setTodoFilter', this.$route.name);
  },
};
</script>
