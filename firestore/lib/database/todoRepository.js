"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.getOneTodo = getOneTodo;
exports.getTodosWithParams = getTodosWithParams;
exports.removeTodos = removeTodos;
exports.updateTodos = updateTodos;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _db = _interopRequireDefault(require("./db"));
var _pickFields = _interopRequireDefault(require("../helpers/utils/pickFields"));
var _prepareDocs = _interopRequireDefault(require("../helpers/utils/prepareDocs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRef = _db.default.collection("todos");
const documentId = _firebaseAdmin.default.firestore.FieldPath.documentId();
async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();
  if (!docRef.data()) {
    throw new Error();
  }
  const todo = {
    ...docRef.data(),
    id: docRef.id
  };
  if (fields?.length > 0) {
    return (0, _pickFields.default)(todo, fields);
  }
  return todo;
}
async function getTodosWithParams(params) {
  const {
    sort = "desc",
    limit = 100
  } = params;
  let orderRef = todoRef.orderBy("createdAt", sort);
  if (limit) {
    orderRef = todoRef.orderBy("createdAt", sort).limit(parseInt(limit));
  }
  const snapshot = await orderRef.get();
  return (0, _prepareDocs.default)(snapshot);
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
  if (!ids?.length) {
    throw new Error();
  }
  const querySnapshot = await todoRef.where(documentId, "in", ids).get();
  const deletes = querySnapshot.docs.map(doc => doc.ref.delete());
  return await Promise.all(deletes);
}
async function updateTodos(ids) {
  if (!ids?.length) {
    throw new Error();
  }
  const querySnapshot = await todoRef.where(documentId, "in", ids).get();
  const updates = querySnapshot.docs.map(doc => doc.ref.update({
    isCompleted: !documentSnapshot.data().isCompleted,
    updatedAt: _firebaseAdmin.default.firestore.Timestamp.now()
  }));
  return await Promise.all(updates);
}
//# sourceMappingURL=todoRepository.js.map