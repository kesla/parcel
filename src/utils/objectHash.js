const XXHash = require('xxhash');

function objectHash(object) {
  let hash = new XXHash(0);
  for (let key of Object.keys(object).sort()) {
    let val = object[key];
    if (typeof val === 'object' && val) {
      hash.update(Buffer.from(key + objectHash(val)));
    } else {
      hash.update(Buffer.from(key + val));
    }
  }

  return hash.digest('hex');
}

module.exports = objectHash;
