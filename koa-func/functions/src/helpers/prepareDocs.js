export function prepareDocs(querySnapshot) {
  return querySnapshot.docs.map((doc) => prepareData(doc));
}
export function prepareData(doc) {
  return { ...doc.data(), id: doc.id };
}
