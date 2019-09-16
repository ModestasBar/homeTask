//Užduotis SEB 15/09/2019 - Modestas Baranauskas
/*
Parašyti konsolinę aplikaciją, priimančią du skaitinius parametrus, ir veikiančią pagal aprašymą.
Aplikacijos išvedimas – skaičius, nurodantis kiek kartų palyginimas davė teigiamą rezultatą po 1‘000‘000 
(1 milijono) palyginimų. - (1 million EXAMPLES);
     Pasitestavimui:
    - Su parametrais 65 ir 8921, rezultatas 3868;
    - Su parametrais 635 ir 12, rezultatas 3926;
 */

const dataSet = (() => {
    const COF_A = 16807;
    const COF_B = 48271;
    const NUM_DIVIDER = 2147483647;
    const EXAMPLES = 1000000;

    const PAR_A = 65;
    const PAR_B = 8921;


    return {
        COF_A,
        COF_B,
        NUM_DIVIDER,
        EXAMPLES,
        PAR_A,
        PAR_B,
    };
})();

//Function to count down until 0;
const cuntDownDescend = (number) => {
    return number >= 0;
};

//Generate a number using equation
const equationNumber = (primaryVal ,multiplyCoef, divideCoef) => {
    return (primaryVal * multiplyCoef) % divideCoef;  
};

//Function to generate required binaries
const generateBitRange = (value, start = 0, end = 8) => {
    //Reverse string and split to required size, after reverse back to represent bin value.
    return value.toString(2).split("").reverse().join("").slice(start, end).split("").reverse().join("");
};

//Task to execute
const compareBinaries = (firstBin, secondBin) => {
    return firstBin === secondBin;
};

//Parent function to display results
const displayResult = (counter, equation, mutation, task) => {
    let firstExample = 0;
    let secondExample = 0;
    let result = 0;
    while(counter(dataSet.EXAMPLES)) {

        //Pick first number and mutate according conditions
        firstExample = equation(dataSet.PAR_A, dataSet.COF_A, dataSet.NUM_DIVIDER);
        dataSet.PAR_A = firstExample;
        firstExample = mutation(firstExample);

        //Pick second number and mutate according conditions
        secondExample = equation(dataSet.PAR_B, dataSet.COF_B, dataSet.NUM_DIVIDER);
        dataSet.PAR_B = secondExample;
        secondExample = mutation(secondExample);

        //Execute task
        if(task(firstExample, secondExample)) result++;

        //Decrement by one from count value
        dataSet.EXAMPLES--;

    }
    return result;
};

console.log(displayResult(cuntDownDescend, equationNumber, generateBitRange, compareBinaries));








// console.log(valueGenerator(65, 16807, 2147483647));


