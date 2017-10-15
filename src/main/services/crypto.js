const crypto = require('crypto');

const getHash = (clearText, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(clearText + salt);
    return hash.digest('hex');
};

module.exports = {
    getHash: getHash,
};
