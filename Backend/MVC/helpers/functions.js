

module.exports.checkDuplicated = (value) => {
  const duplicated = value.filter(
    (item, index) => value.indexOf(item) !== index
  );
  return !Boolean(duplicated.length);
};

module.exports.itemsLimit = (items, min = 2, max = 15) => {
  return items.length <= max && items.length >= min;
};

module.exports.checkUniqueItems = (items) => {
  return new Set(items).size === items.length;
};

module.exports.checkUniqueProject = (items) => {
  let projArr = [];
  for (let item of items) {
    projArr.push(item.project);
  }
  return new Set(projArr).size === projArr.length;
};



