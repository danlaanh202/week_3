export function prepareDocs(querySnapshot) {
  return querySnapshot.docs.map((doc) =>
    prepareData({ ...doc.data(), id: doc.id })
  );
}
export function prepareData(doc) {
  return { ...doc.data(), id: doc.id };
}
