const commonApi = require('../src/api_common');
const objectApi = require('../src/api_object');
const hash = require('../src/hash');
const bs58 = require("bs58");
var card = require('../src/cards');

const ecc = Object.assign({}, commonApi, objectApi);

module.exports = ecc


var seed = '7631185:Mx0VPhFcR3VrDrEYX80D:1547603945';
var signature = 'SIG_K1_JwktwWXa925Atzg6GGoxY4FBwciQ5SgCMC1wj3tt3hPrESfHto1Dvqut5Lu2zRkq8YXKqUGU5bJTCNg6exuiaACJim1bXy';
var pubkey = 'EOS6yfs3y6fLiEX7kYHJvTx2jycCNc21v7ygLuLvGPuVARZwbEvdi';

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

var player = [];
var dealer = [];
for(var i = 0; i < 10; i++)
{
    if(i % 2 == 0)
    {
        player.push(vecRandData[i]);
    }
    else
    {
        dealer.push(vecRandData[i]);
    }
}

console.log("dealer", card.cards_to_string(dealer));
console.log("player", card.cards_to_string(player));