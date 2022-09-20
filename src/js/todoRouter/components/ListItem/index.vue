<template>
  <li :class="['todo__item', todoCompleted ? 'is-completed' : '']">
    <div class="todo__item__inner">
      <div class="todo__item__completed">
        <button
          class="todo__item__completed__btn"
          type="button"
          @click="$emit('change-completed')"
        >
          <template v-if="todoCompleted">
            <span>完了</span>
          </template>
          <template v-else>
            <span>未完了</span>
          </template>
        </button>
      </div>
      <div class="todo__item__desc">
        <h2 class="todo__item__desc__title">{{ todoTitle }}</h2>
        <p class="todo__item__desc__detail">{{ todoDetail }}</p>
      </div>
      <div class="todo__item__btn">
        <button
          class="todo__item__btn__edit"
          type="button"
          @click="$emit('show-editor')"
        >
          編集
        </button>
        <button
          class="todo__item__btn__delete"
          type="button"
          @click="$emit('delete-todo')"
        >
          削除
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todoTitle: {
      type: String,
      default: '',
    },
    todoDetail: {
      type: String,
      default: '',
    },
    todoCompleted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.todo__item {
  padding: 15px 10px;
  border-top: 1px solid #ddd;
  transition: all .3s;
  &:first-child {
    border-top: none;
  }
  &.is-completed {
    color: #ccc;
    background-color: #f3f3f3;
    .todo__item__completed__btn {
      text-decoration: line-through;
      color: #ccc;
      border: 2px solid #eaeaea;
      background-color: #eaeaea;
    }
    .todo__item__desc__title,
    .todo__item__desc__detail {
      color: #ccc;
    }
  }
  &__inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__completed {
    width: 15%;
    min-width: 100px;
    &__btn {
      padding: 5px 10px;
      color: #ff1919;
      font-weight: bold;
      font-size: 12px;
      border-radius: 7px;
      border: 2px solid #ff1919;
      background-color: #fff;
      transition: all .3s;
    }
  }
  &__desc {
    width: 70%;
    min-width: 450px;
    &__title {
      color: #000;
      font-weight: bold;
      font-size: 16px;
      line-height: 1.2;
      transition: all .3s;
    }
    &__detail {
      margin-top: 5px;
      color: #777;
      font-size: 14px;
      line-height: 1.2;
      white-space: pre-line;
      transition: all .3s;
    }
  }
  &__btn {
    width: 10%;
    min-width: 70px;
    text-align: center;
    &__edit,
    &__delete {
      padding: 5px 10px;
      border-radius: 7px;
      color: #fff;
      font-size: 12px;
    }
    &__edit {
      background-color: #07C4D7;
    }
    &__delete {
      margin-top: 5px;
      background-color: #ff1919;
    }
  }
}
</style>
