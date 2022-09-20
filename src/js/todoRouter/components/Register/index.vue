<template>
  <form class="register">
    <div class="register__input">
      <p class="register__input__title">やることのタイトル</p>
      <input
        type="text"
        name="title"
        placeholder="ここにTODOのタイトルを記入してください"
        :value="todoTitle"
        @keyup="$emit('update:todo-title', $event.target.value)"
      >
      <!--
        :value="props名" => propsでvalueをバインド
        this.$emit('update:props名', propsに指定したい値) => 親に伝えるイベントの発火
      -->
    </div>
    <div class="register__input">
      <p class="register__input__title">やることの内容</p>
      <textarea
        name="detail"
        :rows="todoRows"
        placeholder="ここにTODOの内容を記入してください。"
        :value="todoDetail"
        @keyup="$emit('update:todo-detail', $event.target.value)"
      />
    </div>
    <div class="register__submit">
      <button
        class="register__submit__btn"
        type="button"
        name="addButton"
        @click="(todoId === null) ? $emit('add-todo') : $emit('edit-todo')"
      >
        <template v-if="todoId === null">
          <span>登録する</span>
        </template>
        <template v-else>
          <span>変更する</span>
        </template>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    todoId: {
      type: Number,
      default: null,
    },
    todoTitle: {
      type: String,
      default: '',
    },
    todoDetail: {
      type: String,
      default: '',
    },
    todoRows: {
      type: Number,
      default: 3,
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  padding: 10px 20px;
  padding-bottom: 0;
  &__inner {
    width: 80%;
  }
  &__input {
    & + & {
      margin-top: 10px;
    }
    &__title {
      font-weight: bold;
      font-size: 14px;
    }
    input, textarea {
      padding: 10px;
      width: 100%;
      font-size: 14px;
      border: 1px solid #ddd;
    }
  }
  &__submit {
    margin-top: 10px;
    text-align: right;
    &__btn {
      padding: 10px 25px;
      color: #fff;
      font-size: 12px;
      border-radius: 7px;
      background-color: #54b363;
    }
  }
}
</style>
