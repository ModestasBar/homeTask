const calcDate = require('date-and-time');

const actionHistory = {};

const commission = (config, person) => {
    const weekLimit = config.week_limit.amount;
    userInformation(person, actionHistory);
    //If person is above weekly cash out limit - calculate commission according configuration,
    //if not - no commissions fee.
    if(actionHistory[person.user_id].amount > weekLimit) {
        if(!actionHistory[person.user_id].limit) {
            actionHistory[person.user_id].limit = true;
            return  percents(config.percents, actionHistory[person.user_id].amount - weekLimit);
        }
        return percents(config.percents, person.operation.amount);
    }
    return percents();
}

const userInformation = (inputUser, cashOutHistory) => {
    const oneWeek = 7;
    const amount = inputUser.operation.amount;
    const userId = inputUser.user_id;
    //Check if the user has cash out history
    if(cashOutHistory[userId]){
        const userInfo = cashOutHistory[userId];
        const lastCashOutAction = calcDate.subtract(new Date(inputUser.date), userInfo.date).toDays();
    //If last cash out was been made in a range of 7 days - update user total cash out amount,
    //if not - refresh user cash out history.
         Math.abs(lastCashOutAction) < oneWeek ? cashOutHistory[userId].amount = userInfo.amount + amount :
         cashOutHistory[userId] = refreshUserHistory(inputUser.date, amount, false);
    } else {
        //Create user cash out history
        cashOutHistory[userId] = refreshUserHistory(inputUser.date, amount, false);
    }
}

const refreshUserHistory = (date, amount, limit) => {
    return {
        date : new Date(date),
        amount,
        limit
    }
}

const percents = (percent=0, value=0) => (percent * value/100 + 0.004).toFixed(2);

module.exports = {commission};