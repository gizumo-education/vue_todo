<template>
  <div>
    <div class="page-description">
      <p>Todo with Routing of vue-router</p>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.page-description {
  padding: 10px 20px;
  text-align: right;
  p {
    display: inline-block;
    color: #333;
    font-size: 18px;
  }
}
</style>
