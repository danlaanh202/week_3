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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRef = _db.default.collection("todos");
const documentId = _firebaseAdmin.default.firestore.FieldPath.documentId();
async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();
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
    sort,
    limit
  } = params;
  let orderRef = todoRef.orderBy("createdAt", sort);
  if (limit) {
    orderRef = orderRef.limit(limit);
  }
  const snapshot = await orderRef.get();
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
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

  // ============ Batch writes usage ===========
  /*
  let batch = db.batch();
  const querySnapshot = await todoRef.where(documentId, "in", ids).get();
  for (const documentSnapshot of querySnapshot.docs) {
    batch.delete(documentSnapshot.ref);
  }
  return batch.commit();
  */
  // ============ Promise.all usage ===========
  const querySnapshot = await todoRef.where(documentId, "in", ids).get();
  const deletes = [];
  for (const documentSnapshot of querySnapshot.docs) {
    deletes.push(documentSnapshot.ref.delete());
  }
  return await Promise.all(deletes);
}
async function updateTodos(ids) {
  if (!ids?.length) {
    throw new Error();
  }
  // ============ Batch writes usage ===========
  /* let batch = db.batch();
  const querySnapshot = await todoRef.where(documentId, "in", ids).get();
  for (const documentSnapshot of querySnapshot.docs) {
    batch.update(documentSnapshot.ref, {
      isCompleted: !documentSnapshot.doc().isCompleted,
    });
  }
  return batch.commit();
  */

  // ============ Promise.all usage ===========

  const querySnapshot = await todoRef.where(documentId, "in", ids).get();
  const updates = [];
  for (const documentSnapshot of querySnapshot.docs) {
    updates.push(documentSnapshot.ref.update({
      isCompleted: !documentSnapshot.data().isCompleted,
      updatedAt: _firebaseAdmin.default.firestore.Timestamp.now()
    }));
  }
  return await Promise.all(updates);
}
//# sourceMappingURL=todoRepository.js.map