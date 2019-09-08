/* Word Reversal
For any given sentence, reverse the characters of each word in the sentence. */

//Input string of sentence.
//Output string with reversed words.
const reverse = require('reverse-string');

const specificChar = (word) => {
    return /[!-\/:-@[-`{-~]/.test(word);
}

const reverseSentence = (input) => {
    //Transfer word to an array,
    const wordArray = input.split(' ');

    const reversedWordSentence = wordArray.map((word) => {
        //Check if word string consist of specific character
        if(specificChar) {
            //Reverse the word and add specific character at the end
            return reverse(word.slice(0, -1)) +  word.slice(-1);
        }
       return reverse(word);
       //Join array to one sentence
    }).join(' ');
    return reversedWordSentence;
};

console.log(reverseSentence('laba diena visiems kaip, laikotes'));
