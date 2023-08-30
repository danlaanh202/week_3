"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.getOneTodo = getOneTodo;
exports.getTodos = getTodos;
exports.removeTodos = removeTodos;
exports.updateTodos = updateTodos;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _db = _interopRequireDefault(require("./db"));
var _pickFields = _interopRequireDefault(require("../helpers/utils/pickFields"));
var _prepareDocs = require("../helpers/utils/prepareDocs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRef = _db.default.collection("todos");
async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();
  const todo = (0, _prepareDocs.prepareData)(docRef);
  if (fields?.length > 0) {
    return (0, _pickFields.default)(todo, fields);
  }
  return todo;
}
async function getTodos(params) {
  const {
    sort = "desc",
    limit
  } = params;
  let orderRef = todoRef.orderBy("createdAt", sort);
  if (limit) {
    orderRef = orderRef.limit(parseInt(limit));
  }
  const snapshot = await orderRef.get();
  return (0, _prepareDocs.prepareDocs)(snapshot);
}
async function createTodo(data) {
  const createdTodo = {
    ...data,
    createdAt: _firebaseAdmin.default.firestore.Timestamp.now(),
    updatedAt: _firebaseAdmin.default.firestore.Timestamp.now()
  };
  const doc = await todoRef.add(createdTodo);
  return {
    ...createdTodo,
    id: doc.id
  };
}
async function removeTodos(ids) {
  const deletes = ids.map(id => todoRef.doc(id).delete());
  return await Promise.all(deletes);
}
async function updateTodos(todos) {
  const updates = todos.map(todo => todoRef.doc(todo.id).update({
    isCompleted: todo.isCompleted,
    updatedAt: _firebaseAdmin.default.firestore.Timestamp.now()
  }));
  return await Promise.all(updates);
}
//# sourceMappingURL=todoRepository.js.map