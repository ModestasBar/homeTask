const trigonometry = require('trigonometry-equations');

const triangleBySides = (first, second, third) => {
    return (first === second && second === third) && 'Equilateral' ||
    (first === second || first === third || second === third) && 'Isosceles' ||
    'Scalene';
}

const triangleByAngles = (angles) => {
    const rightAngle = 90;
    const equalAngels = 60;
    if(angles.find((angle) => angle === rightAngle)) {
        return 'Right';
    } else if (angles.find((angle) => angle > rightAngle)) {
        return 'Obtuse';
    } else if (angles.every((angle) => angle === equalAngels)) {
        return 'Equiangular';
    } else {
        return 'Acute';
    }
};

const categorize = (first, second, third) => {
        if(first + second <= third || first + third <= second || second + third <= first) {
            return 'Invalid triangle values';
        }
        //Object to set triangle sides
        const unsolvedTriangle = {
            sides: { 0: first, 1: second, 2: third}
        };
        //Angles are calculated using cosine rule
        const anglesCalc = [first, second, third].map((sideLength, sideIndex) => {
            
            //Object to set calculation of angle
            let angleToFind = {
                findAngle: sideIndex
            };
            //cosineRule return an object which consist of properties 'angles' and 'sides'.
            return Math.round(trigonometry.cosineRule(unsolvedTriangle, angleToFind).angles[sideIndex]);
        });


    return 'Classification of triangles by sides - ' + triangleBySides(first,second,third) + '\n'
    + 'Classification of triangles by angles - ' + triangleByAngles(anglesCalc);
}

module.exports ={categorize};