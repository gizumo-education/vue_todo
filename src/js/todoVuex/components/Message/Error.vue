<template>
  <div class="error">
    <p class="error__text">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    errorMessage: function() {
      return this.$store.state.errorMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  padding: 0 20px;
  text-align: center;
  &__text {
    margin-top: 10px;
    padding: 5px;
    color: #f00;
    font-size: 14px;
    background-color: #efefef;
  }
}
</style>
