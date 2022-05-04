import { Context } from 'koa';
import Router from 'koa-router';

import TodoService from '../services/todo';
import { StatusCode } from '../utils/enum';
import createRes from '../utils/response';

const todoService = new TodoService();
const todoRouter = new Router({
  prefix: '/api/todos',
});

todoRouter
  .get('/', async (ctx: Context) => {
    try {
      const data = await todoService.getAllTodos();
      if (data) {
        createRes({
          ctx,
          data,
        });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })

  .put('/status', async (ctx: Context) => {
    const payload = ctx.request.body;
    const { todoId } = payload;
    try {
      const data = await todoService.updateTodoStatus(todoId);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.Accepted });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })
  .put('/content', async (ctx: Context) => {
    const payload = ctx.request.body;
    const { todoId, content } = payload;
    try {
      const data = await todoService.updateTodoContent(todoId, content);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.Accepted });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })
  .post('/', async (ctx: Context) => {
    const payload = ctx.request.body;
    const { content } = payload;
    try {
      const data = await todoService.addTodo(content);
      if (data) {
        createRes({
          ctx,
          statusCode: StatusCode.Created,
          data,
        });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })
  .delete('/:todoId', async (ctx: Context) => {
    const todoId = ctx.params.todoId;
    try {
      const data = await todoService.deleteTodo(todoId);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.NoContent });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  });

export default todoRouter;
