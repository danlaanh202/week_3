"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeMultipleTodoes = completeMultipleTodoes;
exports.createTodo = createTodo;
exports.getAllTodoes = getAllTodoes;
exports.removeMultipleTodoes = removeMultipleTodoes;
exports.removeTodo = removeTodo;
exports.toggleTodo = toggleTodo;
var _dbInit = _interopRequireDefault(require("./dbInit"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRef = _dbInit.default.collection("todoes");
async function getAllTodoes() {
  const snapshot = await todoRef.get();
  return snapshot.docs.map(doc => doc.data());
}
async function createTodo(data) {
  return await todoRef.doc(data.id).set({
    idCompleted: data.isCompleted,
    text: data.text
  });
}
async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}
async function toggleTodo(id) {
  const doc = await todoRef.doc(id).get();
  return await doc.ref.update({
    isCompleted: !doc.data().isCompleted
  });
}
async function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    return;
  }
  const docs = await todoRef.where("id", "in", ids).get();
  // console.log(docs);
  docs.map(doc => {
    console.log(doc.ref);
    return doc.ref.delete();
  });
  return tempTodoes;
}
function completeMultipleTodoes(ids) {
  if (!ids) {
    return;
  }
  const tempTodoes = [...todoes].map(item => ids.includes(item.id) ? {
    ...item,
    isCompleted: true
  } : item);
}
//# sourceMappingURL=todoRepository.js.map