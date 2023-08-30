export function prepareDocs(querySnapshot) {
  return querySnapshot.docs.map((doc) => prepareData(doc));
}
export function prepareData(docRef) {
  return { ...docRef.data(), id: docRef.id };
}
