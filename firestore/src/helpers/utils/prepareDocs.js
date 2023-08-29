export default function prepareDocs(querySnapshot) {
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
