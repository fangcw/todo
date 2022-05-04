<template>
  <q-page class="row justify-evenly">
    <example-component title="RealToDo" active :todos="todos" :meta="meta" @del="del">
    </example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RealToDo',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'RealToDo1',
      },
      {
        id: 2,
        content: 'RealToDo2',
      },
      {
        id: 3,
        content: 'RealToDo3',
      },
      {
        id: 4,
        content: 'RealToDo4',
      },
      {
        id: 5,
        content: 'RealToDo5',
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
