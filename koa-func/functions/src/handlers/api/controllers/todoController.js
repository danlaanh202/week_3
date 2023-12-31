import {
  createTodo,
  getTodos,
  removeTodos,
  updateTodos,
  getOneTodo,
} from "../../../repositories/todoRepository";

export async function getOne(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.req.body;
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
export async function getMany(ctx) {
  try {
    const todos = await getTodos(ctx.req.query);
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
    const data = await createTodo(ctx.req.body);
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
    const { id } = ctx.params;
    const { todo } = ctx.req.body;
    console.log(id);
    await updateTodos([{ ...todo, id }]);
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
    const { todos } = ctx.req.body;
    await updateTodos(todos);
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
    const { ids } = ctx.req.body;
    if (!ids?.length) {
      throw new Error();
    }
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
