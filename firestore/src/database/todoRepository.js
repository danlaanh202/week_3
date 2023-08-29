import admin from "firebase-admin";
import db from "./db";
import pickFields from "../helpers/utils/pickFields";

const todoRef = db.collection("todos");
const documentId = admin.firestore.FieldPath.documentId();

export async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();
  const todo = { ...docRef.data(), id: docRef.id };

  if (fields?.length > 0) {
    return pickFields(todo, fields);
  }
  return todo;
}

export async function getTodosWithParams(params) {
  const { sort, limit } = params;

  let orderRef = todoRef.orderBy("createdAt", sort);
  if (limit) {
    orderRef = orderRef.limit(limit);
  }
  const snapshot = await orderRef.get();
//viết làm prepareDocs cho đoạn return docs ra nhé để còn dùng ở ngoài chỗ 
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function createTodo(data) {
  const createdTodo = {
    ...data,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
  };
  const doc = await todoRef.add(createdTodo);
  return { ...createdTodo, id: doc.id };
}

export async function removeTodos(ids) {
  if (!ids?.length) {
    throw new Error();
  }

  //todo: xóa bớt đoạn này đi cho nó clean nhé 

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

  // todo : chỗ này thay vì todo ta có thể dùng map nhé  nghiên cứu cách dùng nhé + không nên get lại 1 lần todos nũa nhé
  for (const documentSnapshot of querySnapshot.docs) {
    deletes.push(documentSnapshot.ref.delete());
  }
  return await Promise.all(deletes);
}
export async function updateTodos(ids) {
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

  //todo : chỗ này tương tự remove  

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
