"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeMultiple = completeMultiple;
exports.createTd = createTd;
exports.getTodos = getTodos;
exports.remove = remove;
exports.removeMultiple = removeMultiple;
exports.toggle = toggle;
var _todoRepository = require("../../../repositories/todoRepository");
async function getTodos(ctx) {
  try {
    const todos = await (0, _todoRepository.getAllTodos)();
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
    const data = await (0, _todoRepository.createTodo)(ctx.req.body);
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
    await (0, _todoRepository.removeTodo)(id);
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
async function toggle(ctx) {
  try {
    const {
      id
    } = ctx.params;
    await (0, _todoRepository.toggleTodo)(id);
    ctx.status = 201;
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
async function completeMultiple(ctx) {
  try {
    const {
      ids
    } = ctx.req.body;
    await (0, _todoRepository.completeMultipleTodos)(ids);
    ctx.status = 201;
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
    } = ctx.req.body;
    await (0, _todoRepository.removeMultipleTodos)(ids);
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
//# sourceMappingURL=todoController.js.map