import {
  createTodo,
  getTodosWithParams,
  removeTodos,
  updateTodos,
  getOneTodo,
} from "../database/todoRepository";

export async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.body;
    const todo = await getOneTodo(id, fields);
    ctx.status = 200;
    return (ctx.body = {
      data: todo,
      success: true,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
export async function getTodos(ctx) {
  try {
    const todos = await getTodosWithParams(ctx.params);
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
    await removeTodos([id]);
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

export async function update(ctx) {
  try {
    const { id } = ctx.request.params;
    await updateTodos([id]);
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

export async function updateMultiple(ctx) {
  try {
    const { ids } = ctx.request.body;
    await updateTodos(ids);
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
    await removeTodos(ids);
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
