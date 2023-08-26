"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeMultipleTodos = completeMultipleTodos;
exports.createTodo = createTodo;
exports.getAllTodos = getAllTodos;
exports.removeMultipleTodos = removeMultipleTodos;
exports.removeTodo = removeTodo;
exports.toggleTodo = toggleTodo;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _db = _interopRequireDefault(require("./db"));
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const todoRef = _db.default.collection("todos");
const documentId = _firebaseAdmin.default.firestore.FieldPath.documentId();
async function getAllTodos() {
  const snapshot = await todoRef.get();
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}
async function createTodo(data) {
  const generatedId = (0, _uuid.v4)();
  const createdTodo = {
    ...data,
    createdAt: _firebaseAdmin.default.firestore.Timestamp.now()
  };
  await todoRef.doc(generatedId).set(createdTodo);
  return createdTodo;
}
async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}
async function toggleTodo(id) {
  const updateDoc = await todoRef.doc(id).get();
  return await updateDoc.ref.update({
    isCompleted: !updateDoc.data().isCompleted,
    updatedAt: _firebaseAdmin.default.firestore.Timestamp.now()
  });
}
async function removeMultipleTodos(ids) {
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
async function completeMultipleTodos(ids) {
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