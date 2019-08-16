const rules = require('../controller/rules');

test('function exist', ()=> {
    expect(typeof rules.handleCashInAPI).toEqual('function')
})

test('checkIn configurations', async()=> {
    expect(await rules.handleCashInAPI()).toEqual({
        percents: 0.03,
        max: {
        amount: 5,
        currency: "EUR"
        }
    })
})