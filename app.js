/*
Input:
    Json file 'input.json' with data inside
Output: 
    Single number according configuration API's.
*/
const commission = require('./modules/actionEvaluation');
const jsonFile = require('./modules/data');

async function main(url) {
    const readUser = jsonFile.handleData(url);
    for(let i = 0; i < readUser.length; i++) {
       await commission.fee(readUser[i]);
    };
};


main('repository/input.json');



// class UserData {
//     constructor(user) {
//         this.user = user;
//         this.limit = false;
//         this.checkOutHistory = [];
//         this.test();
//     };


//     test() {
//         console.log('aasfsdaf');
//     }
// }

// let user = new UserData();

// console.log(user);


// // const dateTest = require('date-and-time');

// // console.log(dateTest.subtract(new Date('2016-09-19'), new Date('2019-09-18')).toDays());


