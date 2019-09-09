const percents = (percent=0, value=0) =>(percent * value/100 + 0.004).toFixed(2); //+0.004 for correct number round

const commission = (config, amount)=> {
    let fee = percents(config.percents, amount);
    return fee > config.max.amount ? fee = config.max.amount.toFixed(2) : fee;
}

module.exports = {
    commission,
    percents
};