<template lang="html">
  <ul class="todos__list">
    <app-list-item
      v-for="todo in todos"
      :key="todo.id"
      :todo-title="todo.title"
      :todo-detail="todo.detail"
      :todo-completed="todo.completed"
      @changeCompleted="$emit('changeCompleted', todo)"
      @showEditor="$emit('showEditor', todo)"
      @deleteTodo="$emit('deleteTodo', todo.id)"
    />
  </ul>
</template>

<script>
import ListItem from 'TodoRouterDir/components/ListItem';

export default {
  components: {
    appListItem: ListItem,
  },
  props: {
    filter: {
      type: String,
      default: 'all',
    },
    filteredTodos: {
      type: Array,
      default: () => [],
    },
    todos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
