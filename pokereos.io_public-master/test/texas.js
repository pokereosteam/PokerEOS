const commonApi = require('../src/api_common');
const objectApi = require('../src/api_object');
const hash = require('../src/hash');
const bs58 = require("bs58");
var card = require('../src/cards');

const ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc

var seed = "G:1:1:1555929161-pokereostest-pokertest222-aeiou.e";
var signature = "SIG_K1_JvJD3SezCb9B22brdxrYwvKzCMbT3wHBLZGmZSY4XmoCP8BGtogEZ2gF9xXp8Eakqxq1mJSZUHoHEuqsMaGhSkrC9zsN5L";
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

var button = seats[tempindex[0] % curplayer];

var vecCount = 45;
var randCount = 0, position = 0;
do
{
    position = tempindex[randCount]%(card.initcards.length-randCount);
    vecRandData[randCount++] = card.initcards[position];
    card.initcards[position] = card.initcards[card.initcards.length-randCount];
}while(randCount<vecCount)

var i = 0;
var newseat = [];
do
{
    if(newseat.length > 0){
        newseat.push(seats[i % curplayer]);
    }
    if(newseat.length == 0 && seats[i] == button){
        newseat.push(seats[i]);
    }
    if(newseat.length == curplayer)
        break;
    i++;
}while(true)

var cards= {};
for(var i = 0; i < newseat.length; i++){
    cards[newseat[i]] = [];
    cards[newseat[i]].push(vecRandData[i]);
    cards[newseat[i]].push(vecRandData[i + curplayer]);
}

var center = [];
for(var i = 0; i < 5; i++){
    center.push(vecRandData[curplayer*2 + i]);
}

for(var i in cards){
    console.log("cards"+ i, card.cards_to_string(cards[i]));
}

console.log("center", card.cards_to_string(center));
console.log("button", button);
