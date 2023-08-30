export default function (data, fields) {
  // example: fields = [id, name, description]
  const fieldsObj = fields.reduce((prev, key) => {
    if (data[key] || data[key] === false) {
      prev[key] = data[key];
    }
    return prev;
  }, {});
  return fieldsObj;
}
