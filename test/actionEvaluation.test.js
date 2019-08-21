const actionEvaluation = require('../modules/actionEvaluation');

const testUser = [
                { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "USD" }},
                { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "USD" }},
                { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
                { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } }
                ];

test('If currency is incorrect, no numeric value is return', () => {
    expect(Number(actionEvaluation.fee(testUser[0]))).toBeFalsy();
});

describe('Currency correct', () => {
    test('user type is cash In', async () => {
        expect(typeof Number( await actionEvaluation.fee(testUser[1]))).toBe('number');
    });
    describe('check out user', () => {
        test('legal', async () => {
            expect(typeof Number( await actionEvaluation.fee(testUser[2]))).toBe('number');
        });
        test('natural', async () => {
            expect(typeof Number( await actionEvaluation.fee(testUser[3]))).toBe('number');
        });
    });
});