import React from 'react'

const NextButton = ({ onNextClick }) => {
    return (
    <button 
        className="bg-white b hover-gray pa2 br2 pointer active"  
        title="Next"
        onClick={onNextClick}>
        &rarr;
    </button>
    );
}

export default NextButton
