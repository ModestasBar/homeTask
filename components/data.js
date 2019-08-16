const fs = require('fs');

const handleData = (url) => {
    const rawData = fs.readFileSync(url);
    const data = JSON.parse(rawData);

    return data;
}

module.exports = {handleData}