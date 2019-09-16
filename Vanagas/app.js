//Tasks.
//1. Word Reversal
//2. Triangle Categorization
//3. Linked List Traversal

const sentence = require('./modules/reverse-words');
const triangle = require('./modules/triangle-categorization');
const list = require('./modules/single-list');

//Input: String sentence. Output: Sentence with reversed letters in the words
console.log(sentence.reverse('Lorem ipsum dolor sit amet, consectetur - adipisicing elit.'));

//Input: Three numerical values (sides). Output: Categorized triangle by sides and angles.
console.log(triangle.categorize(5,6,10));

    //  Test list
const linkedList = new list.LinkedList();
linkedList.add(1); 
linkedList.add(2); 
linkedList.add(5); 
linkedList.add(6); 
linkedList.add(7); 
linkedList.add(8);
linkedList.add(7); 
linkedList.add(8);

//Input: Single linked list. Output: 5th element from the end of list.
console.log(list.get5thElementFromEnd(linkedList));







