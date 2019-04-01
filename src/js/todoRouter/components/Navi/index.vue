<template lang="html">
  <div class="todo__link">
    <router-link class="todo__link__item" to="/">すべて表示</router-link>
    <router-link class="todo__link__item" to="/incomplete">未完了のみ表示</router-link>
    <router-link class="todo__link__item" to="/completed">完了済のみ表示</router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.todo__link {
  display: flex;
  &__item {
    padding: 10px 0;
    width: 100%;
    color: #999;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    background-color: #c4f3d3;
    &.router-link-exact-active {
      color: #54b363;
      background-color: #fff;
    }
  }
}
</style>
