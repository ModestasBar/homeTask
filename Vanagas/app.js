//---------------------------------------------------------------------------------//
//2. Word Reversal
//For any given sentence, reverse the characters of each word in the sentence 

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

//Note: What if word in a brackets?
// console.log(reverseSentence('laba diena visiems kaip, laikotes'));
//---------------------------------------------------------------------------------//
//1. Triangle Categorization
//Given the numerical lengths of the 3 sides of a triangle, return the type of triangle formed by these 3 sides.

const trigonometry = require('trigonometry-equations');

const triangleBySides = (first, second, third) => {
    return (first === second && second === third) && 'Equilateral' ||
    (first === second || first === third || second === third) && 'Isosceles' ||
    'Scalene';
}

const triangleByAngles = (angles) => {
    const scale90 = 90;
    const scale60 = 60;
    if(angles.find((value) => value === scale90)) {
        return 'Right';
    } else if (angles.find((value) => value > scale90)) {
        return 'Obtuse';
    } else if (angles.every((value) => value === scale60)) {
        return 'Equiangular';
    } else {
        return 'Acute';
    }
};

const triangleCategorization = (first, second, third) => {
        if(first + second <= third || first + third <= second || second + third <= first) {
            return 'Invalid numerical lengths';
        }
        const unsolvedTriangle = {
            sides: { 0: first, 1: second, 2: third}
        };
        const anglesCalc = [first, second, third].map((sideLength, sideIndex) => {
            let angleToFind = {
                findAngle: sideIndex
            };
            //cosineRule return an object which consist of properties 'angles' and 'sides'
            //Extract angle value accessing angles
            return Math.round(trigonometry.cosineRule(unsolvedTriangle, angleToFind).angles[sideIndex]);
        });


    return 'Classification of triangles by sides - ' + triangleBySides(first,second,third) + '\n'
    + 'Classification of triangles by angles - ' + triangleByAngles(anglesCalc);
}

// console.log(triangleCategorization(9,5,5));
//---------------------------------------------------------------------------------//
//3. Linked List Traversal
//Given a singularly linked list of integers, return the 5th integer from the end of the list using the most efficient method

//Step 1.
// Create a class of linked list with method to add new data to it.
//Create a method which return 5 parameter in linked list.

class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(data) {
        const newNode = new LinkedListNode(data);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;            
        }
    }

    get5thIntegerFromEnd(linkedList) {
        let tempNode = linkedList.head;
        //Get length of linkedList
        let counter = 0;
        while (tempNode !== null) {
            tempNode = tempNode.next;
            counter++;         
        }
        //Calculate the length for 5th element from back;
        let lengthToTravel = counter - 5;
        let i = 0;
        let node = linkedList.head;
        while ((data !== null) && (i < lengthToTravel)) {
            node = node.next;
            i++;
        };
        return node !== null ? node.data : undefined;
    }

}

const get5thIntegerFromEnd = (linkedList) => {
    let tempNode = linkedList.head;
    //Get length of linkedList
    let counter = 0;
    while (tempNode !== null) {
        tempNode = tempNode.next;
        counter++;         
    }
    //Calculate the length for 5th element from back;
    let lengthToTravel = counter - 5;
    if(lengthToTravel >=0) {
        let i = 0;
        let node = linkedList.head;
        while ((node !== null) && (i < lengthToTravel)) {
            node = node.next;
            i++;
            console.log(i);
        };
        return node.data;
    }
    return undefined;
}


const list = new LinkedList();
list.add("red");
list.add("orange");
list.add("yellow");
list.add("blue");
list.add("blue");


console.log(get5thIntegerFromEnd(list));




