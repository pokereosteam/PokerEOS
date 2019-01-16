const commonApi = require('../src/api_common');
const objectApi = require('../src/api_object');
const hash = require('../src/hash');
const bs58 = require("bs58");
var card = require('../src/cards');

const ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc

var seed = "804:Pn1wBNwGkGhKX2kB7abcd:1547603858";
var signature = "SIG_K1_KkrstSeMhQTMnwZpk1VF5WTqRf9bgCz2fm2FtrZXtnDc9zevUPQyGH8FscTBcWxVtgQT6zzbnVBNQzM3cxqCYubYmw2HHq";
var pubkey = 'EOS5hqg3tAth5Hi3iJqUKGt6VNhv7TEphsyn9XCTFRPCZPntEMFSi';

if(ecc.isValidPublic(pubkey) == false) {
   console.log('pubkey err');
}
// seed keys match
const recoverKey = ecc.recoverHash(signature, hash.sha256(seed), 'hex');
console.log("Keys are matching: ", pubkey == recoverKey);

var vecRandIndex = hash.sha256(signature, 'hex');

var vecRandData = [];
var tempindex = [];

for(var i = 0; i < vecRandIndex.length; i += 2) 
{
    tempindex.push(parseInt(vecRandIndex.slice(i, i + 2), 16));
}

var vecCount = 9;
var randCount = 0, position = 0;
do
{
    position = tempindex[randCount]%(card.initcards.length-randCount);
    vecRandData[randCount++] = card.initcards[position];
    card.initcards[position] = card.initcards[card.initcards.length-randCount];
}while(randCount<vecCount)

var player = [];
var dealer = [];
var center = [];
for(var i = 0; i < 9; i++){
    if(i < 4) {
        if(i % 2 == 0) {
            player.push(vecRandData[i]);
        }else {
            dealer.push(vecRandData[i]);
        }
    } else {
        center.push(vecRandData[i]);
    }
}

console.log("player", card.cards_to_string(player));
console.log("dealer", card.cards_to_string(dealer));
console.log("center", card.cards_to_string(center));