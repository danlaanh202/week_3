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
  const res = await todoRef.doc(data.id).set(data);
  return res;
}
async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}
c;
async function toggleTodo(id) {
  const updateDoc = await todoRef.doc(id).get();
  await updateDoc.ref.update({
    isCompleted: !updateDoc.data().isCompleted
  });
}
async function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    return;
  }
  const docs = await todoRef.where("id", "in", ids).get();
  let batch = _dbInit.default.batch();
  docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  return batch.commit();
}
async function completeMultipleTodoes(ids) {
  if (!ids) {
    return;
  }
  const docs = await todoRef.where("id", "in", ids).get();
  docs.forEach(doc => {
    batch.update(doc.ref, {
      isCompleted: true
    });
  });
  return batch.commit();
}
//# sourceMappingURL=todoRepository.js.map