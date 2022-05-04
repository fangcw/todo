import Todo from '../db/models/todo';

export default class TodoService {
  public async addTodo( content: string) {
    const todo = new Todo({
      content,
    });
    try {
      const res = await todo.save();
      return res;
    } catch (error) {
      throw new Error('新增失败 (￣o￣).zZ');
    }
  }
  public async deleteTodo(todoId: string) {
    try {
      return await Todo.findByIdAndDelete(todoId);
    } catch (error) {
      throw new Error('删除失败 (￣o￣).zZ');
    }
  }
  public async getAllTodos() {
    try {
      const res = await Todo.find()
      return res;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }
  public async updateTodoStatus(todoId: string) {
    try {
      const oldRecord = await Todo.findById(todoId);
      const record = await Todo.findByIdAndUpdate(todoId, {
        status: !oldRecord?.status,
      });
      return record;
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }
  public async updateTodoContent(todoId: string, content: string) {
    try {
      return await Todo.findByIdAndUpdate(todoId, { content });
    } catch (error) {
      throw new Error('更新内容失败 (￣o￣).zZ');
    }
  }
}