const crypto = require('crypto');

exports.md5 = (hash_val) => {
    return crypto.createHash('md5').update(hash_val).digest("hex");
}