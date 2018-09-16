const fs = require('fs');
const XXHash = require('xxhash');

const HashStream = XXHash.Stream;

function md5(string, encoding = 'hex') {
  return XXHash.hash(Buffer.from(string), 0, encoding);
}

md5.file = function(filename) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(new HashStream(0, 'hex'))
      .on('finish', function() {
        resolve(this.read());
      })
      .on('error', reject);
  });
};

module.exports = md5;
