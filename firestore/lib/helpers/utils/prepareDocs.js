"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareData = prepareData;
exports.prepareDocs = prepareDocs;
function prepareDocs(querySnapshot) {
  return querySnapshot.docs.map(doc => prepareData({
    ...doc.data(),
    id: doc.id
  }));
}
function prepareData(doc) {
  return {
    ...doc.data(),
    id: doc.id
  };
}
//# sourceMappingURL=prepareDocs.js.map