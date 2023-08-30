import admin from "firebase-admin";
import db from "./db";
import pickFields from "../helpers/utils/pickFields";
import prepareDocs from "../helpers/utils/prepareDocs";

const todoRef = db.collection("todos");

export async function getOneTodo(id, fields) {
  const docRef = await todoRef.doc(id).get();
  //todo : đừng return error kiểu này không có thì nó trả ra rỗng chứ có phải lỗi đâu mà trả kiểu này hả em 
  if (!docRef.data()) {
    throw new Error();
  }
  //todo : có hàm prepareData rồi thì dùng nó chứ .
  const todo = { ...docRef.data(), id: docRef.id };

  if (fields?.length > 0) {
    return pickFields(todo, fields);
  }
  return todo;
}

export async function getTodosWithParams(params) {
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
  //todo: cái này check ở ngoài controller đi thì trông nó hợp lí hơn 
  if (!ids?.length) {
    throw new Error();
  }

  const deletes = ids.map((id) => todoRef.doc(id).delete());
  return await Promise.all(deletes);
}

export async function updateTodos(todos) {
  if (!todos?.length) {
    throw new Error();
  }

  const updates = todos.map((todo) =>
    todoRef.doc(todo.id).update({
      isCompleted: todo.isCompleted,
      updatedAt: admin.firestore.Timestamp.now(),
    })
  );
  return await Promise.all(updates);
}
