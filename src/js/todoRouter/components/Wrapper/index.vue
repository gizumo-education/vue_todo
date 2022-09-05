<template>
  <div class="wrapper">
    <div class="inner">
      <app-header />
      <main class="main">
        <slot />
        <div class="todos">
          <slot name="todos" />
        </div>
      </main>
      <app-footer :todos="todos" />
    </div>
  </div>
</template>

<script>
import Header from 'TodoRouterDir/components/Header/index.vue';
import Footer from 'TodoRouterDir/components/Footer/index.vue';

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  padding: 20px 0;
  width: 720px;
  max-height: 100vh;
}
.inner {
  position: relative;
  max-height: calc(100vh - 40px);
  border-radius: 10px;
  box-shadow: #aaa 0 0 20px 1px;
}
.main {
  padding: 78px 0 56px;
  max-height: calc(100vh - 40px);
  overflow: scroll;
  border-radius: 10px;
  background-color: #fff;
}
.todos {
  margin-top: 20px;
  padding: 10px;
}

</style>
