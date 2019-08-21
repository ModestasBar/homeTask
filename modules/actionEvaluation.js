const rules = require('../controller/rules');
const cashIn = require('./cashIn');
const cashOut = require('./cashOut');


const fee = async user => {
const acceptingCurrency = 'EUR';

if(user.operation.currency === acceptingCurrency){
    //Cash in commission calculation
    if(user.type == 'cash_in') {
        const cashInAPI = await rules.handleCashInAPI();
        return console.log(cashIn.commission(cashInAPI, user.operation.amount));
    }
    //Cash out commissions fee when user is natural
    if(user.user_type == 'natural') {
        const cashOutAPINatural = await rules.handleCashOutAPINatural();
        return console.log(cashOut.commissionNatural(cashOutAPINatural, user));
    }
    //Cash out commissions fee when user is legal
    const cashOutAPIPersonal = await rules.handleCashOutAPIPersonal();
    return console.log(cashOut.commissionLegal(cashOutAPIPersonal, user.operation.amount));
    }       
return console.log(`Currency error`);
}

module.exports = {fee};