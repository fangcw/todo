<template>
  <q-page class="row justify-evenly">
    <example-component-store title="StoreToDo" active :todos="todos" :meta="meta" @del="del">
    </example-component-store>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponentStore from 'components/ExampleComponentStore.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'StoreToDo',
  components: { ExampleComponentStore },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'StoreToDo1',
      },
      {
        id: 2,
        content: 'StoreToDo2',
      },
      {
        id: 3,
        content: 'StoreToDo3',
      },
      {
        id: 4,
        content: 'StoreToDo4',
      },
      {
        id: 5,
        content: 'StoreToDo5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    const del = (todoId: number) => {
      todos.value = todos.value.filter((item) => item.id !== todoId);
    };
    return { todos, meta, del };
  },
});
</script>
