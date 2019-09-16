const fs = require('fs');

const handleData = url => data = JSON.parse(fs.readFileSync(url));

module.exports = {handleData};