import admin from "firebase-admin";
import db from "./db";
import pickFields from "../helpers/utils/pickFields";
import prepareDocs from "../helpers/utils/prepareDocs";

const todoRef = db.collection("todos");
const documentId = admin.firestore.FieldPath.documentId();

export async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();
  if (!docRef.data()) {
    throw new Error();
  }
  const todo = { ...docRef.data(), id: docRef.id };

  if (fields?.length > 0) {
    return pickFields(todo, fields);
  }
  return todo;
}

export async function getTodosWithParams(params) {
  const { sort = "desc", limit = 100 } = params;

  let orderRef = todoRef.orderBy("createdAt", sort);
  if (limit) {
    orderRef = todoRef.orderBy("createdAt", sort).limit(parseInt(limit));
  }
  const snapshot = await orderRef.get();

  return prepareDocs(snapshot);
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

  const querySnapshot = await todoRef.where(documentId, "in", ids).get();

  const deletes = querySnapshot.docs.map((doc) => doc.ref.delete());
  return await Promise.all(deletes);
}

export async function updateTodos(ids) {
  if (!ids?.length) {
    throw new Error();
  }

  const querySnapshot = await todoRef.where(documentId, "in", ids).get();

  const updates = querySnapshot.docs.map((doc) =>
    doc.ref.update({
      isCompleted: !doc.data().isCompleted,
      updatedAt: admin.firestore.Timestamp.now(),
    })
  );
  return await Promise.all(updates);
}
