/*
Input:
    Json file 'input.json' with data inside
Output: 
    Single number according configuration API's.
*/
const action = require('./modules/actionEvaluation');
const jsonFile = require('./modules/data');

async function main(url) {
    const readUser = jsonFile.handleData(url);
    for(let i = 0; i < readUser.length; i++) {
        console.log(await action.fee(readUser[i])); 
    };
};


main('repository/input.json');

