var crypto = require('crypto');
var salt = require('../config/tsconfig.json');

exports.cryptoThePassword = (password) => {
    let key = "Keyefqwdfodsdv&&&^^^9n";
    // password = salt.salt+password;
    // let enc = crypto.createCipher("aes-256-ctr",key).update(password,"utf-8","hex");
    return crypto.createHash('sha1').update(password+salt.salt).digest('hex');

};

exports.hashcryptoThePassword = (password) => {
    let key = "Keyefqwdfodsdv&&&^^^9n";
    password = salt.salt+password;
    let enc = crypto.createCipher("aes-256-ctr",key).update(password,"utf-8","hex");
    return enc;

};