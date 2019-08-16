const percents = (percent=0, value=0) => (percent * value/100 + 0.004).toFixed(2); //+0.004 for correct number round

const commission = (rules, amount)=> {
    let fee = percents(rules.percents, amount);
    if(fee > rules.max.amount) {
        return fee = rules.max.amount.toFixed(2);
    }
    return fee;
}

module.exports = {
    commission,
    percents
}