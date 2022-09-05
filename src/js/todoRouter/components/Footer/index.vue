<template>
  <footer class="footer">
    <p>全項目数: {{ todos.length }}</p>
    <p>未完了: {{ todos.filter(todo => !todo.completed).length }}</p>
    <p>完了済: {{ todos.filter(todo => todo.completed).length }}</p>
  </footer>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  font-size: 14px;
  line-height: 1.2;
  color: #555;
  border-radius: 0 0 10px 10px;
  background-color: #ddd;
}
</style>
