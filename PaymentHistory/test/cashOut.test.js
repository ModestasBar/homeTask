const naturalCashOut = require('../modules/cashOut/natural');
const legalCashOut = require('../modules/cashOut/legal');
const rules = require('../controller/rules');

const testUsers = [
                { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 100.00, "currency": "EUR" }},
                { "date": "2016-01-13", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" }},
                { "date": "2016-01-14", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 1100.00, "currency": "EUR" }}
                ];

const testCheckOutDB = {};

describe('Check user state in user check out data base', () => {
    test('create new user', () => {
        naturalCashOut.userInformation(testUsers[0], testCheckOutDB);
        expect(typeof naturalCashOut.refreshUserHistory(testUsers[0].date, testUsers[0].operation.amount, false)).toBe('object');
    });

    test('refresh user data', () => {
        naturalCashOut.userInformation(testUsers[1], testCheckOutDB);
        expect(typeof naturalCashOut.refreshUserHistory(testUsers[1].date, testUsers[1].operation.amount, false)).toBe('object');
    });
});

test('Natural user total cash out amount exceed weekly limit, calculate commissions', async () => {
    const configuration = await rules.handleCashOutAPINatural();
    naturalCashOut.userInformation(testUsers[2], testCheckOutDB);
    expect(Number(naturalCashOut.commission(configuration, testUsers[2]))).toBeGreaterThan(0);
});

describe('Cash out for legal users', () => {
    test('fee is smaller then mix fee', async () => {
        const amount = testUsers[0].operation.amount; //Percentage fee of 100 is less then min cash out fee
        const configurations = await rules.handleCashOutAPIPersonal();
        const minAmount = configurations.min.amount;
        expect((legalCashOut.commission(configurations, amount))).toEqual(Number(minAmount));
    });
    
    test('Fee is bigger then min fee', async () => {
        const amount = testUsers[1].operation.amount; //percentage fee is more than max cash out fee
        const configurations = await rules.handleCashOutAPIPersonal();
        const minAmount = configurations.min.amount;
        expect(Number(legalCashOut.commission(configurations, amount))).toBeGreaterThan(Number(minAmount));
    });
});


