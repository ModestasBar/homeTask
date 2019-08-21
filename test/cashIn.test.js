const cashIn = require('../modules/cashIn');
const rules = require('../controller/rules');


test('Function calculate percentage values', () => {
    expect(typeof Number(cashIn.percents(10, 100))).toBe('number');
});

test('If percents or value is not provided calculate percents', () => {
    expect(Number(cashIn.percents())).toBeDefined();
});

describe('Cash in fee amount', () => {
    test('is bigger then max fee', async () => {
        const amount = 20000; //percentage fee of 20000 is more then max cash in fee
        const configurations = await rules.handleCashInAPI();
        expect(typeof Number(cashIn.commission(configurations, amount))).toBe('number');
    });
    
    test('is smaller then max fee', async () => {
        const amount = 1000; //percentage fee of 1000 is less than max cash in fee
        const configurations = await rules.handleCashInAPI();
        expect(typeof Number(cashIn.commission(configurations, amount))).toBe('number');
    });
});

