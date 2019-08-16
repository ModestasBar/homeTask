const rules = require('../controller/rules');

test('function exist', ()=> {
    expect(typeof rules.handleCashInAPI).toEqual('function')
})