"use strict";

let card = module.exports;

card.initcards = 
[
    0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D, 
    0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1A,0x1B,0x1C,0x1D, 
    0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2A,0x2B,0x2C,0x2D, 
    0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39,0x3A,0x3B,0x3C,0x3D
];

card.card_to_string = function(card) {
    var color = (card & 0xF0)>>4;
    var value = (card & 0x0F);
    var color_str = '';
    var value_str = '';
    switch(color)
    {
        case 0: 
            color_str = '♦'; break;
        case 1: 
            color_str = '♣'; break;
        case 2: 
            color_str = '♥'; break;
        case 3: 
            color_str = '♠'; break;
        default:
            color_str = 'unknown';
    }
    switch(value)
    {
        case 0x01:{
            value_str = "A"; break;
        }
        case 0x0B:{
             value_str = "J";break;
        }
        case 0x0C:{
            value_str = "Q";break;
        }
        case 0x0D:{
            value_str = "K";break;
        }
        default:
            value_str = parseInt(value);
    }
    return color_str + value_str;
}

card.cards_to_string = function(cards) {
    var ret = '';
    for(var i = 0; i < cards.length; i++)
    {
        ret += this.card_to_string(cards[i]);
        if (i + 1 < cards.length) {
            ret += " ";
        }
    }
    return ret;
}