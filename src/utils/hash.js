const fs = require('fs');
const {murmurHash} = require('murmurhash-native');
const {createHash} = require('murmurhash-native/stream');

function hash(string, encoding = 'hex') {
  return murmurHash(string, 0, encoding);
}

hash.file = function(filename) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(createHash('murmurHash', {seed: 0, encoding: 'hex'}))
      .on('finish', function() {
        resolve(this.read());
      })
      .on('error', reject);
  });
};

module.exports = hash;
