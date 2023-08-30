"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTd = createTd;
exports.getMany = getMany;
exports.getOne = getOne;
exports.remove = remove;
exports.removeMultiple = removeMultiple;
exports.update = update;
exports.updateMultiple = updateMultiple;
var _todoRepository = require("../database/todoRepository");
async function getOne(ctx) {
  try {
    const {
      id
    } = ctx.params;
    const {
      fields
    } = ctx.request.body;
    const todo = await (0, _todoRepository.getOneTodo)(id, fields);
    ctx.status = 200;
    return ctx.body = {
      data: todo,
      success: true
    };
  } catch (error) {
    ctx.status = 500;
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function getMany(ctx) {
  try {
    const todos = await (0, _todoRepository.getTodos)(ctx.request.query);
    ctx.status = 200;
    return ctx.body = {
      data: todos,
      success: true
    };
  } catch (e) {
    ctx.status = 500;
    return ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
async function createTd(ctx) {
  try {
    const data = await (0, _todoRepository.createTodo)(ctx.request.body);
    ctx.status = 201;
    return ctx.body = {
      success: true,
      data
    };
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function remove(ctx) {
  try {
    const {
      id
    } = ctx.params;
    await (0, _todoRepository.removeTodos)([id]);
    ctx.status = 200;
    return ctx.body = {
      success: true
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function update(ctx) {
  try {
    const {
      id
    } = ctx.request.params;
    const {
      todo
    } = ctx.request.body;
    await (0, _todoRepository.updateTodos)([{
      ...todo,
      id
    }]);
    ctx.status = 200;
    return ctx.body = {
      success: true
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function updateMultiple(ctx) {
  try {
    const {
      todos
    } = ctx.request.body;
    await (0, _todoRepository.updateTodos)(todos);
    ctx.status = 200;
    return ctx.body = {
      success: true
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function removeMultiple(ctx) {
  try {
    const {
      ids
    } = ctx.request.body;
    if (!ids?.length) {
      throw new Error();
    }
    await (0, _todoRepository.removeTodos)(ids);
    ctx.status = 200;
    return ctx.body = {
      success: true
    };
  } catch (error) {
    console.log(error);
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
//# sourceMappingURL=todoHandlers.js.map