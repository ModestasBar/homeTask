const request = require('request');

// wrap a request in an promise
function downloadPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}

// now to program the "usual" way
// all you need to do is use async functions and await
// for functions returning promises
async function myBackEndLogic() {
    try {
        const html = await downloadPage('https://microsoft.com')
        console.log('SHOULD WORK:');
        console.log(html);

        // try downloading an invalid url
        await downloadPage('http://      .com')
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
    }
}

// run your async function
myBackEndLogic();