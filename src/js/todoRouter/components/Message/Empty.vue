<template lang="html">
  <p class="empty">{{ message }}</p>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      default: 'all',
    },
  },
  data() {
    return {
      message: 'やることリストには何も登録されていません。',
    };
  },
  created() {
    this.setMessage();
  },
  methods: {
    setMessage() {
      if (this.filter === 'completed') {
        this.message = '完了済みのやることリストはありません。';
      } else if (this.filter === 'incomplete') {
        this.message = '未完了のやることリストはありません。';
      } else {
        this.message = 'やることリストには何も登録されていません。';
      }
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
