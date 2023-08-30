import admin from "firebase-admin";
import db from "./db";
import pickFields from "../helpers/utils/pickFields";
import { prepareData, prepareDocs } from "../helpers/utils/prepareDocs";

const todoRef = db.collection("todos");

export async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();

  const todo = prepareData(docRef);

  if (fields?.length > 0) {
    return pickFields(todo, fields);
  }
  return todo;
}

export async function getTodos(params) {
  const { sort = "desc", limit } = params;
  let orderRef = todoRef.orderBy("createdAt", sort);
  if (limit) {
    orderRef = orderRef.limit(parseInt(limit));
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
  const deletes = ids.map((id) => todoRef.doc(id).delete());
  return await Promise.all(deletes);
}

export async function save(id,postData){
  todoRef.doc(id).update({...postData, updatedAt: admin.firestore.Timestamp.now()})
}

export async function updateTodos(todos) {
  const updates = todos.map((todo) =>
    save(todo.id,{isCompleted: todo.isCompleted})
  );
  return await Promise.all(updates);
}
