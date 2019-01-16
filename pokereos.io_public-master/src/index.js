const commonApi = require('./api_common');
const objectApi = require('./api_object');
const hash = require('./hash');
const bs58 = require("bs58");
var card = require('./cards');

const ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc
