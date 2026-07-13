export const filterObjFields = (obj, ...allowedFields) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (allowedFields.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
