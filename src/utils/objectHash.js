const stringify = require('fast-json-stable-stringify');
const hash = require('./hash');

function objectHash(object) {
  return hash(stringify(object));
}

module.exports = objectHash;
