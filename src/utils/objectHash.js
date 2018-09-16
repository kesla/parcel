const hash = require('./hash');

function objectHash(object) {
  return hash(
    Object.keys(object)
      .sort()
      .map(key => {
        let val = object[key];
        return typeof val === 'object' && val
          ? key + objectHash(val)
          : key + val;
      })
      .join('')
  );
}

module.exports = objectHash;
