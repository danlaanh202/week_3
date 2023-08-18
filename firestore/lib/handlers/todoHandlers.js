"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeMultiple = completeMultiple;
exports.createTd = createTd;
exports.getTodoes = getTodoes;
exports.remove = remove;
exports.removeMultiple = removeMultiple;
exports.toggle = toggle;
var _todoRepository = require("../database/todoRepository");
async function getTodoes(ctx) {
  try {
    const todoes = await (0, _todoRepository.getAllTodoes)();
    ctx.status = 200;
    return ctx.body = {
      data: todoes,
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
    await (0, _todoRepository.createTodo)(ctx.request.body);
    return ctx.body = {
      success: true,
      data: ctx.request.body
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
    } = ctx.request.body;
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
    } = ctx.request.body;
    await (0, _todoRepository.completeMultipleTodoes)(ids);
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
  // POST METHOD
  try {
    const {
      ids
    } = ctx.request.body;
    await (0, _todoRepository.removeMultipleTodoes)(ids);
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
//# sourceMappingURL=todoHandlers.js.map