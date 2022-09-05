<template>
  <p class="empty">{{ emptyMessage }}</p>
</template>

<script>
export default {
  props: {
    emptyMessage: {
      type: String,
      default: '',
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
