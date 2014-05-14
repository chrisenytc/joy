'use strict';

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
exports.uid = function(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

exports.uidLight = function(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a unique_token identifier in database
 *
 *     utils.unique_token();
 *     // => "C2rSNV2sBpYBWeqfnNxT4WW2axB7TCoFxZIAYeMKhFtAqNQf0k3cTa186I9ueZqeGCK4WQDHgNArAElCP0XbL4EPEafyy3gmgvq1ZAPmSsPX20GhlpR9bLzCHxMMgZNfJGoCAmq2c9RcE9a2Nf3MkQAGZJrvfPAST6ijLCSkjE27jRtUitujV8VzLUWsW6bZWw671iaPZ0e1cuumUHALKfdLiBVeUYuVoBkSxGqw6CrQcEGHHiA62MaTRkxdB6r4"
 *
 * @return {String}
 * @api private
 */
exports.unique_token = function() {
    //Generate
    var uid = exports.uid(16),
        uid2 = exports.uid(16),
        uid3 = exports.uid(16),
        uid4 = exports.uid(16),
        uid5 = exports.uid(16),
        uid6 = exports.uid(16),
        uid7 = exports.uid(16),
        uid8 = exports.uid(16),
        uid9 = exports.uid(16),
        uid10 = exports.uid(16),
        uid11 = exports.uid(16),
        uid12 = exports.uid(16),
        uid13 = exports.uid(16),
        uid14 = exports.uid(16),
        uid15 = exports.uid(16),
        uid16 = exports.uid(16),
        access_token = uid16 + uid15 + uid14 + uid13 + uid12 + uid11 + uid10 + uid9 + uid8 + uid7 + uid6 + uid5 + uid4 + uid3 + uid2 + uid;
        return access_token;
};

/**
 * Retrun a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
