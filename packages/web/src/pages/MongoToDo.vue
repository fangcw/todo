<template>
  <q-page class="row justify-evenly">
    <example-component-mongo
      title="MongoToDo"
      active
      :todos="todos"
      :meta="meta"
      @del="del"
      @add="batchAdd"
    >
    </example-component-mongo>
  </q-page>
</template>

<script lang="ts">
import { MToDo, Meta, IRes } from 'components/models';
import ExampleComponentMongo from 'components/ExampleComponentMongo.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { api } from '../boot/axios';

function useToDo() {
  const todos = ref<MToDo[]>([]);

  const findAll = () => api.get<string, IRes<MToDo[]>>('/api/todos').then((res) => {
    const todoList = res.data || [];
    todos.value = todoList;
  });

  const del = (todoId: number) => api.delete(`/api/todos/${todoId}`).then(() => {
    findAll();
  });

  const add = (content: string) => api.post('/api/todos', { content });
  const batchAdd = () => {
    let { length: start } = todos.value;
    const all = Array(5).fill(1).map(() => {
      const content = `MongoToDo${start + 1}`;
      start += 1;
      return add(content);
    });
    return Promise.all(all).then(() => {
      findAll();
    });
  };

  onMounted(() => {
    findAll();
  });
  return {
    todos, batchAdd, del,
  };
}

export default defineComponent({
  name: 'StoreToDo',
  components: { ExampleComponentMongo },
  setup() {
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    const { todos, del, batchAdd } = useToDo();
    return {
      todos, meta, del, batchAdd,
    };
  },
});
</script>
