<template>
  <div>
    <h4>{{ title }}</h4>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo._id" class="todo-item">
        <div class="todo-item-name" @click="increment">
          {{ todo._id }} - {{ todo.content }}
        </div>
        <q-icon class="todo-item-del" name="delete" @click="() => del(todo._id)" />
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <q-btn color="primary" @click="add">添加五条数据</q-btn>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  toRef,
  Ref,
} from 'vue';
import { MToDo, Meta } from './models';
import { useCounterStore } from '../stores/StoreToDo';

const useCounter = useCounterStore();

function useClickCount() {
  const clickCount = computed(() => useCounter.counter);
  const { increment } = useCounter;

  return { clickCount, increment };
}

function useDisplayTodo(todos: Ref<MToDo[]>) {
  const todoCount = computed(() => todos.value.length);
  return { todoCount };
}

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: Array as PropType<MToDo[]>,
      default: () => [],
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const del = (todoId: string) => {
      context.emit('del', todoId);
    };
    const add = () => {
      context.emit('add');
    };
    return {
      ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')), del, add,
    };
  },
});
</script>
<style lang="scss" scoped>
.todo {
  &-list {
    padding: 0;
  }

  &-item {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    border-bottom: 1px solid #999;
    cursor: pointer;
    user-select: none;

    &-name {
      text-align: left;
      flex: 1;
    }

    &-del {
      font-size: 16px;
      padding: 0 10px;
    }
  }
}
</style>
