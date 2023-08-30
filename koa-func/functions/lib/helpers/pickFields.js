"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(data, fields) {
  // example: fields = [id, name, description]
  const fieldsObj = fields.reduce((prev, key) => {
    if (data[key] || data[key] === false) {
      prev[key] = data[key];
    }
    return prev;
  }, {});
  return fieldsObj;
}
//# sourceMappingURL=pickFields.js.map