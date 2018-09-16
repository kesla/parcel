const fs = require('fs');
const XXHash = require('xxhash');

const HashStream = XXHash.Stream;

function hash(string, encoding = 'hex') {
  return XXHash.hash(Buffer.from(string), 0, encoding);
}

hash.file = function(filename) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(new HashStream(0, 'hex'))
      .on('finish', function() {
        resolve(this.read());
      })
      .on('error', reject);
  });
};

module.exports = hash;
