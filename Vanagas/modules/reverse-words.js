const reverser = require('reverse-string');

const specificChar = (word) => {
    //Regex for specific symbols
    return /[!-\/:-@[-`{-~]/.test(word);
}

const reverse = (input) => {
    //Transfer sentence to an array,
    const wordArray = input.split(' ');

    const reversedWordSentence = wordArray.map((word) => {
        //Check if word string consist of specific character
        if(specificChar(word)) {
            //Reverse the word and add specific character at the end
            return reverser(word.slice(0, -1)) +  word.slice(-1);
        }
       return reverser(word);
       //Join array to one sentence
    }).join(' ');
    return reversedWordSentence;
};

module.exports = {reverse};