const rules = require('../controller/rules');
 
test('Cash in configurations passed as object', async () => {
    expect(await rules.handleCashInAPI()).toEqual({
        percents: 0.03,
        max: {
        amount: 5,
        currency: "EUR"
        }
    });
});

test('Personal configurations passed as an object', async () => {
    expect(await rules.handleCashOutAPIPersonal()).toEqual({
        percents: 0.3,
        min: {
        amount: 0.5,
        currency: "EUR"
        }
    });
});

test('Juridical configurations passed as an object', async () => {
    expect(await rules.handleCashOutAPINatural()).toEqual({
        percents: 0.3,
        week_limit: {
        amount: 1000,
        currency: "EUR"
        }
    });
});
