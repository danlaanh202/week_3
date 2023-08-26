import admin from "firebase-admin";
import db from "./dbInit";
import { v4 as uuid } from "uuid";
const todoRef = db.collection("todos");
const documentId = admin.firestore.FieldPath.documentId();
export async function getAllTodos() {
  const snapshot = await todoRef.get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function createTodo(data) {
  const generatedId = uuid();
  await todoRef.doc(generatedId).set(data);
  return { ...data, id: generatedId };
}

export async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}

export async function toggleTodo(id) {
  const updateDoc = await todoRef.doc(id).get();
  await updateDoc.ref.update({
    isCompleted: !updateDoc.data().isCompleted,
  });
}
export async function removeMultipleTodos(ids) {
  if (ids?.length) {
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
  if (ids?.length === 0) {
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
      })
    );
  }
  return await Promise.all(updates);
}
