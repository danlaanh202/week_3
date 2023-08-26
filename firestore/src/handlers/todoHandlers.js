import {
  createTodo,
  getAllTodos,
  removeTodo,
  removeMultipleTodos,
  toggleTodo,
  completeMultipleTodos,
} from "../database/todoRepository";

export async function getTodos(ctx) {
  try {
    const todos = await getAllTodos();
    ctx.status = 200;
    return (ctx.body = {
      data: todos,
      success: true,
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      error: e.message,
    });
  }
}

export async function createTd(ctx) {
  try {
    const data = await createTodo(ctx.request.body);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function remove(ctx) {
  try {
    const { id } = ctx.params;
    await removeTodo(id);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

export async function toggle(ctx) {
  try {
    const { id } = ctx.request.params;
    await toggleTodo(id);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

export async function completeMultiple(ctx) {
  try {
    const { ids } = ctx.request.body;
    await completeMultipleTodos(ids);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
export async function removeMultiple(ctx) {
  try {
    const { ids } = ctx.request.body;
    await removeMultipleTodos(ids);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
