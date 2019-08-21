const rules = require('../controller/rules');
 
test('Cash in configurations passed as object', async () => {
    expect(typeof await rules.handleCashInAPI()).toBe('object')
});


test('Personal configurations passed as an object', async () => {
    expect(typeof await rules.handleCashOutAPIPersonal()).toBe('object')
});

test('Juridical configurations passed as an object', async () => {
    expect(typeof await rules.handleCashOutAPINatural()).toBe('object')
});
