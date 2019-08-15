const fetch = require('node-fetch');
const fs = require('fs');




const handleCashInAPI = () => {
    return fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in')
    .then(response => response.json())
    .catch(err => console.log(err));
}

const handleCashOutAPINatural = () => {
    return  fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural')
    .then(response => response.json())
    .catch(err => console.log(err));
}

const handleCashOutAPIPersonal = () => {
    return fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical')
    .then(response => response.json())
    .catch(err => console.log(err));
}


module.exports = {
    handleCashInAPI,
    handleCashOutAPINatural,
    handleCashOutAPIPersonal
}