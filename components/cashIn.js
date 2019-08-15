percents = (percent=0, value=0) => (percent * value/100).toFixed(2);

const commission = (rules, amount)=> {
    let fee = percents(rules.percents, amount);
    if(fee > rules.max.amount) {
        return fee = rules.max.amount.toFixed(2);
    }
    return fee;
}

module.exports = {
    commission
}