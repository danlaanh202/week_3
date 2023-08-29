"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareDocs;
function prepareDocs(querySnapshot) {
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}
//# sourceMappingURL=prepareDocs.js.map