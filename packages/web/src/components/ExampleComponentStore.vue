<template>
  <div>
    <h4>{{ title }}</h4>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-item-name" @click="increment">
          {{ todo.id }} - {{ todo.content }}
        </div>
        <q-icon class="todo-item-del" name="delete" @click="() => del(todo.id)" />
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
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
import { Todo, Meta } from './models';
import { useCounterStore } from '../stores/StoreToDo';

const useCounter = useCounterStore();

function useClickCount() {
  const clickCount = computed(() => useCounter.counter);
  const { increment } = useCounter;

  return { clickCount, increment };
}

function useDisplayTodo(todos: Ref<Todo[]>) {
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
      type: Array as PropType<Todo[]>,
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
    const del = (todoId: number) => {
      context.emit('del', todoId);
    };
    return {
      ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')), del,
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
