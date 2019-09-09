const rules = require('../controller/rules');
const cashIn = require('./cashIn');
const legalCashOut = require('./cashOut/legal');
const naturalCashOut = require('./cashOut/natural');
const currency = 'EUR';

const fee = async user => {
    if(user.operation.currency === currency){
        //Cash in commission calculation
        if(user.type == 'cash_in') {
            const cashInAPI = await rules.handleCashInAPI();
            return (cashIn.commission(cashInAPI, user.operation.amount));
        }
        //Cash out commissions fee when user is natural
        if(user.user_type == 'natural') {
            const cashOutAPINatural = await rules.handleCashOutAPINatural();
            return (naturalCashOut.commission(cashOutAPINatural, user));
        }
        //Cash out commissions fee when user is legal
        const cashOutAPIPersonal = await rules.handleCashOutAPIPersonal();
        return (legalCashOut.commission(cashOutAPIPersonal, user.operation.amount));
        }       
    return (`Currency error`);
}



module.exports = {fee};