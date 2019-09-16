const get5thElementFromEnd = (linkedList) => {
    const elementNumber = 5;
    //Get length of linkedList
    let tempNode = linkedList.head;
    let counter = 0;
    while (tempNode !== null) {
        tempNode = tempNode.next;
        counter++;         
    }
    //Calculate the length for 5th element from back and iterate;
    let lengthToTravel = counter - elementNumber;
    if(lengthToTravel >= 0) {
        let i = 0;
        let node = linkedList.head;
        while ((node !== null) && (i < lengthToTravel)) {
            node = node.next;
            i++;
        };
        return node.data;
    }
    return undefined;
}

//Single linked list for tests
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
}

module.exports = {
    get5thElementFromEnd,
    LinkedList
};