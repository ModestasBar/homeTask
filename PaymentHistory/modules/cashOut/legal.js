const commission = (config, amount)=> {
    //Calculate commission fee according configuration
    let fee = percents(config.percents, amount);
    return fee < config.min.amount ? fee = config.min.amount : fee;
}

const percents = (percent=0, value=0) => (percent * value/100 + 0.004).toFixed(2);

module.exports = {
    commission,
    percents
};


