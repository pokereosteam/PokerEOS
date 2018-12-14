
const ecc = require("eosjs-ecc");
var hash = require('./hash');
const bs58 = require("bs58");
var card = require('./cards');

module.exports = ecc

var seed = '';
var signature = '';
var pubkey = '';


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
var vecRandIndex = signhash.slice(0, 20);

var vecRandData = [];
var tempindex = [];

for(var i = 0; i < vecRandIndex.length; i += 2) 
{
    tempindex.push(parseInt(vecRandIndex.slice(i, i + 2), 16));
}

var vecCount = 10;
var randCount = 0, position = 0;
do
{
    position = tempindex[randCount]%(card.initcards.length-randCount);
    vecRandData[randCount++] = card.initcards[position];
    card.initcards[position] = card.initcards[card.initcards.length-randCount];
}while(randCount<vecCount)

var card1 = [];
var card2 = [];
for(var i = 0; i < 10; i++)
{
    if(i % 2 == 0)
    {
        card1.push(vecRandData[i]);
    }
    else
    {
        card2.push(vecRandData[i]);
    }
}


console.log("card1", card.cards_to_string(card1));
console.log("card2", card.cards_to_string(card2));

