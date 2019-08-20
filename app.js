/*
Input:
    Json file 'input.json' with data inside
Output: 
    Single number according configuration API's.
*/
const rules = require('./controller/rules');
const jsonFile = require('./modules/data');
const cashIn = require('./modules/cashIn');
const cashOut = require('./modules/cashOut');



async function main(url) {
const acceptingCurrency = 'EUR';
const inputFile = jsonFile.handleData(url);

//API requests for configuration
const cashInAPI = await rules.handleCashInAPI();
const cashOutAPINatural = await rules.handleCashOutAPINatural();
const cashOutAPIPersonal = await rules.handleCashOutAPIPersonal();

//To track user cash out history
// const cashOutHistory = {};

inputFile.forEach(user=> {
    if(user.operation.currency === acceptingCurrency){
        //Cash in commission calculation
        if(user.type == 'cash_in') {
            return console.log(cashIn.commission(cashInAPI, user.operation.amount));
        }
        //Cash out commissions fee when user is natural
        return user.user_type == 'natural' ? console.log(cashOut.commissionNatural(cashOutAPINatural, user)) : 
        //Cash out commissions fee when user is legal
        console.log(cashOut.commissionLegal(cashOutAPIPersonal, user.operation.amount));
    }       
    return console.log(`Currency error`);
})
};

main('repository/input.json');






// const dateTest = require('date-and-time');

// console.log(dateTest.subtract(new Date('2016-09-19'), new Date('2019-09-18')).toDays());


