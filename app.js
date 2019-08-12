/*
Input:
    Json file 'input.json' with data inside
Output: 
    Single number according calculated commission fee.
*/

const fetch = require('node-fetch');

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

cashInCommission = (rules, amount)=> {
    let fee = rules.percents * amount;
    if(fee > rules.max.amount) {
        return fee = rules.max.amount;
    }
    return fee;
}

cashOutCommissionLegal = (rules, amount)=> {
    let fee = rules.percents * amount;
    if(fee < rules.min.amount) {
        return fee = rules.min.amount;
    }
    return fee;
}


function main(val) {
    const operationType = val.map(user=> {
        if(user.type == 'cash_in') {
           //calculate cash in commission
            const fee = cashInCommission(cashInAPI, user.operation.amount);
            console.log(fee); 
        } else {
            if(user.user_type == 'natural') {
                //calculate cash out commissions fee when natural
                const fee = cashOutCommissionLegal(cashOutAPIPersonal, user.operation.amount);
                console.log(fee);
            } else {
                console.log('cash out juridical');
                //calculate cash out commissions fee when juridical
            }
        }
    })
}

main(input);




