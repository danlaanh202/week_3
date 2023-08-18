import fs from "fs";
const { data: todoes } = require("./todoes.json");
import path from "path";
function saveTodo(data) {
  fs.writeFileSync(
    path.join(__dirname, "/todoes.json"),
    JSON.stringify({
      data,
    })
  );
}

export function getAllTodoes() {
  return todoes;
}

export function createTodo(data) {
  const updatedTodoes = [data, ...todoes];
  saveTodo(updatedTodoes);
}

export function removeTodo(id) {
  const tempTodoes = [...todoes];
  const result = tempTodoes.filter((item) => item.id !== id);
  saveTodo(result);
}

export function toggleTodo(id) {
  const result = [...todoes].map((item) =>
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveTodo(result);
}
export function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    removeTodoes();
  }
  const tempTodoes = [...todoes].filter((item) => !ids.includes(item.id));
  saveTodo(tempTodoes);
  return tempTodoes;
}
export function toggleMultipleTodoes(ids) {
  if (!ids) {
    return;
  }

  const tempTodoes = [...todoes].map((item) =>
    ids.includes(item.id) ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveTodo(tempTodoes);
}

export function removeTodoes() {
  saveTodo([]);
}
