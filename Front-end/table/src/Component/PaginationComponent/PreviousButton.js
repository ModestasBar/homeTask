import React from 'react'

const PreviousButton = ({ onPrevClick }) => {
    return (
    <button
        onClick={onPrevClick}
        className="bg-white b hover-gray pa2 br2 pointer active" 
        title="Previous">
        &larr;
    </button>
    );
}

export default PreviousButton
