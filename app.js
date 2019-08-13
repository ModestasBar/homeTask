/*
Input:
    Json file 'input.json' with data inside
Output: 
    Single number according calculated commission fee.
*/

const fetch = require('node-fetch');
const date = require('date-and-time');
const percentage = require('percentage-calc');

const input = [
    { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } },
    { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
]

const cashInAPI = {
    percents: 0.03,
    max: {
        amount: 5,
        currency: "EUR"
    }
}

const cashOutAPINatural = {
    percents: 0.3,
    week_limit: {
        amount: 1000,
        currency: "EUR"
    }
}

const cashOutAPIPersonal = {
    percents: 0.3,
    min: {
        amount: 0.5,
        currency: "EUR"
    }
}


// function cashIn(){
//     fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in')
//     .then(response => response.json())
//     .then(data => data)
//     .catch(error => console.log(error,'Fail to retrieve cash in information'))
// }

// function cashOutNaturalPersons() {
//     fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error,'Fail to retrieve cash out information'))
// }

// function cashOutLegalPersons() {
//     fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error,'Fail to retrieve cash out information'))
// }

calPercent = (percent, value) => (percent * value/100).toFixed(2);

cashInCommission = (rules, amount)=> {
    let fee = calPercent(rules.percents, amount);
    if(fee > rules.max.amount) {
        return fee = rules.max.amount.toFixed(2);
    }
    return fee;
}

cashOutCommissionLegal = (rules, amount)=> {
    let fee = calPercent(rules.percents, amount);
    if(fee < rules.min.amount) {
        return fee = rules.min.amount;
    }
    return fee;
}
//------
const testPerson = { "date": "2016-01-12", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } }

const checkOutInformationDb = {
    
}

naturalUserCashOutInformation = (person, userCheckOutHistory) => {
    const oneWeek = 7;
    // console.log(userCheckOutHistory[1])
    if(userCheckOutHistory[person.user_id]){
        //If date is older than 7 days 
        const actionAge = date.subtract(new Date(person.date), userCheckOutHistory[1].date).toDays();
        if(actionAge > oneWeek){
            //rewrite amount and date
            checkOutInformationDb[person.user_id].amount = person.operation.amount;
            checkOutInformationDb[person.user_id].date = new Date(person.date);
            checkOutInformationDb[person.user_id].limit = false;
        } else {
            //update amount and check if limit is not exceed
            checkOutInformationDb[person.user_id].amount = checkOutInformationDb[person.user_id].amount + person.operation.amount;
        }
    } else {
    //Create new user in information name information.user+id and in it create date and amount
        userCheckOutHistory[person.user_id] = {date: new Date(person.date), amount: person.operation.amount, limit: false};
    }
}




cashOutCommissionNatural = (rules, personInfo, person) => {
        //1.Check if personInfo.user+(person+id).amount is more than 1000 euro
        if(personInfo[person.user_id].amount > 1000) {
            if(!personInfo[person.user_id].limit) {
                personInfo[person.user_id].limit = true;
                return  calPercent(rules.percents, personInfo[person.user_id].amount-1000);
            } else {
                return calPercent(rules.percents, person.operation.amount);
            }
        }
        return Number(0).toFixed(2);
}


function main(val) {
     val.forEach(user=> {
        if(user.type == 'cash_in') {
           //calculate cash in commission
            const fee = cashInCommission(cashInAPI, user.operation.amount);
            console.log(fee); 
        } else {
            if(user.user_type == 'natural') {
                //calculate cash out commissions fee when is natural persons
                naturalUserCashOutInformation(user, checkOutInformationDb);
                const fee = cashOutCommissionNatural(cashOutAPINatural, checkOutInformationDb, user)
                console.log(fee);
            } else {
                //calculate cash out commissions fee when is legal persons
                const fee = cashOutCommissionLegal(cashOutAPIPersonal, user.operation.amount);
                console.log(fee);
            }
        }
    })
}

main(input);





