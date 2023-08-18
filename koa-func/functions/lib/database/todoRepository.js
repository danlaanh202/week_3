"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.getAllTodoes = getAllTodoes;
exports.removeMultipleTodoes = removeMultipleTodoes;
exports.removeTodo = removeTodo;
exports.removeTodoes = removeTodoes;
exports.toggleMultipleTodoes = toggleMultipleTodoes;
exports.toggleTodo = toggleTodo;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  data: todoes
} = require("./todoes.json");
function saveTodo(data) {
  _fs.default.writeFileSync(_path.default.join(__dirname, "/todoes.json"), JSON.stringify({
    data
  }));
}
function getAllTodoes() {
  return todoes;
}
function createTodo(data) {
  const updatedTodoes = [data, ...todoes];
  saveTodo(updatedTodoes);
}
function removeTodo(id) {
  const tempTodoes = [...todoes];
  const result = tempTodoes.filter(item => item.id !== id);
  saveTodo(result);
}
function toggleTodo(id) {
  const result = [...todoes].map(item => item.id === id ? {
    ...item,
    isCompleted: !item.isCompleted
  } : item);
  saveTodo(result);
}
function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    removeTodoes();
  }
  const tempTodoes = [...todoes].filter(item => !ids.includes(item.id));
  saveTodo(tempTodoes);
  return tempTodoes;
}
function toggleMultipleTodoes(ids) {
  if (!ids) {
    return;
  }
  const tempTodoes = [...todoes].map(item => ids.includes(item.id) ? {
    ...item,
    isCompleted: !item.isCompleted
  } : item);
  saveTodo(tempTodoes);
}
function removeTodoes() {
  saveTodo([]);
}
//# sourceMappingURL=todoRepository.js.map