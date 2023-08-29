import admin from "firebase-admin";
import db from "./db";
import { v4 as uuid } from "uuid";
const todoRef = db.collection("todos");
const documentId = admin.firestore.FieldPath.documentId();
export async function getAllTodos() {
  const snapshot = await todoRef.orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function createTodo(data) {
  const generatedId = uuid();
  const createdTodo = { ...data, createdAt: admin.firestore.Timestamp.now(), updatedAt: admin.firestore.Timestamp.now() };
  await todoRef.doc(generatedId).set(createdTodo);
  return {...createdTodo, id: generatedId};
}

export async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}

export async function toggleTodo(id) {
  const updateDoc = await todoRef.doc(id).get();
  return await updateDoc.ref.update({
    isCompleted: !updateDoc.data().isCompleted,
    updatedAt: admin.firestore.Timestamp.now(),
  });
}
export async function removeMultipleTodos(ids) {
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
export async function completeMultipleTodos(ids) {
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
    updates.push(
      documentSnapshot.ref.update({
        isCompleted: !documentSnapshot.data().isCompleted,
        updatedAt: admin.firestore.Timestamp.now(),
      })
    );
  }
  return await Promise.all(updates);
}
