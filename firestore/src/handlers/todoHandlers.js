import {
  createTodo,
  getAllTodoes,
  removeTodo,
  removeMultipleTodoes,
  toggleTodo,
  completeMultipleTodoes,
} from "../database/todoRepository";

export async function getTodoes(ctx) {
  try {
    const todoes = await getAllTodoes();
    ctx.status = 200;
    return (ctx.body = {
      data: todoes,
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
    await createTodo(ctx.request.body);
    return (ctx.body = {
      success: true,
      data: ctx.request.body,
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
    const { id } = ctx.request.body;
    await toggleTodo(id);
    ctx.status = 201;
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
    await completeMultipleTodoes(ids);
    ctx.status = 201;
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
  // POST METHOD
  try {
    const { ids } = ctx.request.body;
    await removeMultipleTodoes(ids);
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
