const commonApi = require('../src/api_common');
const objectApi = require('../src/api_object');
const hash = require('../src/hash');
const bs58 = require("bs58");
var card = require('../src/cards');

const ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc

// for Example 


// "thisSeed": "hjb9hmrg28l9xd0j5d",
// "lastbethash": "8cee96bebcb70d862f9ffb73ea95c6c0e2441c0075d19d81f599a0e55828b6d2",
// "newSeed": "hjb9hmrg28l9xd0j5d:81f599a0e55828b6d2"

// and    seed = "hjb9hmrg28l9xd0j5d81f599a0e55828b6d2";    Remove symbol ：

var seed = '9wiwfjg9uez6aoomm865f3573770eb8840ef';
var signature = 'SIG_K1_K86QfWgMpZdXAgrFg6T2Yg15HzUjuqMRNdC69HeUYDVjo1pttVwrXTBSPQRu9PDbnxiuScVgwTbWkRnhdC82tvUrJpVqrA';
var pubkey = 'EOS8Uyf5QroLcmdQQ7T4Dg8nTK6D1K6mFdpF1ePdDpYajuok298AB';

if(ecc.isValidPublic(pubkey) == false) {
   console.log('pubkey err');
}
// seed keys match
const recoverKey = ecc.recoverHash(signature, hash.sha256(seed), 'hex');
console.log("Keys are matching: ", pubkey == recoverKey);


var tempSig = signature.substring(7);
var bytes = bs58.decode(tempSig);
var bytes_str = bytes.toString('hex');
bytes_str = bytes_str.substring(0, bytes_str.length - 8);
bytes_str = '00' + bytes_str;
var signhash = ecc.sha256(Buffer.from(bytes_str, 'hex'));
var vecRandIndex = signhash.slice(0, 4);

var vecRandData = [];
var tempindex = [];

for(var i = 0; i < vecRandIndex.length; i += 2) 
{
    tempindex.push(parseInt(vecRandIndex.slice(i, i + 2), 16));
}

var vecCount = 2;
var randCount = 0, position = 0;
do
{
    position = tempindex[randCount]%(card.initcards.length-randCount);
    vecRandData[randCount++] = card.initcards[position];
    card.initcards[position] = card.initcards[card.initcards.length-randCount];
}while(randCount<vecCount)




var dealer = [];
var tb = {};
for(var i = 0; i < 2; i++) {
    tb[i] = {};
    tb[i].cards = [];
}

for(var i = 0; i < 2; i++)
{
    var index = i % 2;
    tb[index].cards.push(vecRandData[i]);
  
}

for(var i = 1; i < 3; i++) {
    console.log("tb" + i + ' : ', card.cards_to_string(tb[i - 1].cards));
}


