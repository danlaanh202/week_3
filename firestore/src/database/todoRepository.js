import db from "./dbInit";
const todoRef = db.collection("todoes");
export async function getAllTodoes() {
  const snapshot = await todoRef.get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function createTodo(data) {
  return await todoRef
    .doc(data.id)
    .set({ idCompleted: data.isCompleted, text: data.text });
}

export async function removeTodo(id) {
  return await todoRef.doc(id).delete();
}

export async function toggleTodo(id) {
  const doc = await todoRef.doc(id).get();
  return await doc.ref.update({
    isCompleted: !doc.data().isCompleted,
  });
}
export async function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    return;
  }

  const docs = await todoRef.where("id", "in", ids).get();
  // console.log(docs);
  docs.map((doc) => {
    console.log(doc.ref);
    return doc.ref.delete();
  });
  return tempTodoes;
}
export function completeMultipleTodoes(ids) {
  if (!ids) {
    return;
  }

  const tempTodoes = [...todoes].map((item) =>
    ids.includes(item.id) ? { ...item, isCompleted: true } : item
  );
}
