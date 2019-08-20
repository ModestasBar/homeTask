const cashIn = require('../modules/cashIn');
const rules = require('../controller/rules');


test('Function calculate percentage values', () => {
    expect(cashIn.percents()).toEqual('Number');
});

test('If percents or value is not provided to calculate percents', () => {
    expect(cashIn.percents()).toBe(Number(0).toFixed(2));
});


test('Cash in fee amount is bigger then max fee', async () => {
    const amount = 20000; //percentage fee of 20000 is more then max cash in fee
    const configurations = await rules.handleCashInAPI();
    const maxAmount = configurations.max.amount.toFixed(2);
    expect(cashIn.commission(configurations, amount)).toBe(maxAmount);
});

test('Cash in fee amount is smaller then max fee', async () => {
    const amount = 1000; //percentage fee of 1000 is less than max cash in fee
    const configurations = await rules.handleCashInAPI();
    expect(cashIn.commission(configurations, amount)).toBe(Number(0.3).toFixed(2));
});

