<template>
  <ul class="todos__list">
    <app-list-item
      v-for="todo in todos"
      :key="todo.id"
      :todo-title="todo.title"
      :todo-detail="todo.detail"
      :todo-completed="todo.completed"
      @change-completed="$emit('change-completed', todo)"
      @show-editor="$emit('show-editor', todo)"
      @delete-todo="$emit('delete-todo', todo.id)"
    />
  </ul>
</template>

<script>
import ListItem from 'TodoRouterDir/components/ListItem/index.vue';

export default {
  components: {
    appListItem: ListItem,
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
