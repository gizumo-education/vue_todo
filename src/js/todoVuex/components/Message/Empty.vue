<template>
  <p class="empty">{{ emptyMessage }}</p>
</template>

<script>
export default {
  computed: {
    emptyMessage: function() {
      return this.$store.state.emptyMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
.empty {
  font-size: 14px;
  text-align: center;
}
</style>
