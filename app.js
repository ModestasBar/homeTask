/*
Input:
    Json file 'input.json' with data inside
Output: 
    Single number according configuration API's.
*/
const rules = require('./controller/rules');
const jsonFile = require('./components/data');
const cashIn = require('./components/cashIn');
const cashOut = require('./components/cashOut');

async function main(url) {
const checkOutHistory = {}; //User checkout history object
const input = jsonFile.handleData(url); //Input file

//API requests for configuration
const cashInAPI = await rules.handleCashInAPI();
const cashOutAPINatural = await rules.handleCashOutAPINatural();
const cashOutAPIPersonal = await rules.handleCashOutAPIPersonal();

    input.forEach(user=> {
        if(user.type == 'cash_in') {
            //Cash in commission calculation
            const fee = cashIn.commission(cashInAPI, user.operation.amount);
            console.log(fee); 
        } else {
            if(user.user_type == 'natural') {
                //Cash out commissions fee when user is natural
                cashOut.userInformation(user, checkOutHistory);
                const fee = cashOut.commissionNatural(cashOutAPINatural, checkOutHistory, user);
                console.log(fee);
            } else {
                //Cash out commissions fee when user is legal
                const fee = cashOut.commissionLegal(cashOutAPIPersonal, user.operation.amount);
                console.log(fee);
            }
        }
    })
}

main('repository/input.json');









