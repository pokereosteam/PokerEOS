const commonApi = require('../src/api_common');
const objectApi = require('../src/api_object');
const hash = require('../src/hash');
const bs58 = require("bs58");
var card = require('../src/cards');

const ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc

var seed = "H:1:1:1563201802-pokertest333-scgspzuufccc-pokereostest";
var signature = "SIG_K1_KY34zHG19FUqBVUQLziyKGck6Yk5oEpum98XRYytiNQVhkrPdGDchs6yepsisnqBAr7UkPxypAjJ9E7WF6xGv6h8k8YM8s";
var pubkey = 'EOS5hqg3tAth5Hi3iJqUKGt6VNhv7TEphsyn9XCTFRPCZPntEMFSi';
var curplayer = (seed.split('-')).length-1;

var seats = [];
for(var i = 1; i <= curplayer; i++){
    seats.push(i);
}

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

var vecCount = 45;
var randCount = 0, position = 0;
do
{
    position = tempindex[randCount]%(card.initcards.length-randCount);
    vecRandData[randCount++] = card.initcards[position];
    card.initcards[position] = card.initcards[card.initcards.length-randCount];
}while(randCount<vecCount)

var cards= {};
for(var i = 0; i < seats.length; i++){
    cards[seats[i]] = [];
    cards[seats[i]].push(vecRandData[i]);
    cards[seats[i]].push(vecRandData[i + curplayer *1]);
    cards[seats[i]].push(vecRandData[i + curplayer *2]);
    cards[seats[i]].push(vecRandData[i + curplayer *3]);
    cards[seats[i]].push(vecRandData[i + curplayer *4]);
}

for(var i in cards){
    console.log("cards"+ i, card.cards_to_string(cards[i]));
}

