import db from "./dbInit";

const todoRef = db.collection("todoes");

export async function getAllTodoes() {
  const snapshot = await todoRef.get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function createTodo(data) {
  const res = await todoRef.doc(data.id).set(data);
  return res;
}

export async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}c

export async function toggleTodo(id) {
  const updateDoc = await todoRef.doc(id).get();
  await updateDoc.ref.update({
    isCompleted: !updateDoc.data().isCompleted,
  });
}
export async function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    return;
  }

  const docs = await todoRef.where("id", "in", ids).get();

  let batch = db.batch();
  docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  return batch.commit();
}
export async function completeMultipleTodoes(ids) {
  if (!ids) {
    return;
  }
  const docs = await todoRef.where("id", "in", ids).get();
  docs.forEach((doc) => {
    batch.update(doc.ref, { isCompleted: true });
  });
  return batch.commit();
}
