const calcDate = require('date-and-time');

const refreshUserHistory = (date, amount, limit)=> {
    return {
        date : new Date(date),
        amount,
        limit
    }
}

percents = (percent=0, value=0) => (percent * value/100 + 0.004).toFixed(2);

const userInformation = (inputUser, checkOutHistory) => {
    const oneWeek = 7;
    const amount = inputUser.operation.amount;
    const userId = inputUser.user_id
    //Check if the user has checkout history
    if(checkOutHistory[userId]){
        const userInfo = checkOutHistory[userId];
        const lastCheckOutAction = calcDate.subtract(new Date(inputUser.date), userInfo.date).toDays();
    //If last checkout was been made in a range of 7 days - update user total checkout amount,
    //if not - refresh user checkout history.
         lastCheckOutAction < oneWeek ? checkOutHistory[userId].amount = userInfo.amount + amount :
        checkOutHistory[userId] = refreshUserHistory(inputUser.date, amount, false);
    } else {
        //Create user checkout history
        checkOutHistory[userId] = refreshUserHistory(inputUser.date, amount, false);
    }
}

const commissionNatural = (rules, userInfo, person) => {
    //If person is above weekly checkout limit - calculate commission according configuration,
    //if not - no commissions fee.
        const weekLimit = rules.week_limit.amount;
        if(userInfo[person.user_id].amount > weekLimit) {
            if(!userInfo[person.user_id].limit) {
                userInfo[person.user_id].limit = true;
                return  percents(rules.percents, userInfo[person.user_id].amount - weekLimit);
            } else {
                return percents(rules.percents, person.operation.amount);
            }
        }
        return percents();
}

const commissionLegal = (rules, amount)=> {
    //Calculate commission fee according configuration
    let fee = percents(rules.percents, amount);
    if(fee < rules.min.amount) {
        return fee = rules.min.amount;
    }
    return fee;
}

module.exports = {
    userInformation,
    commissionNatural,
    commissionLegal
}