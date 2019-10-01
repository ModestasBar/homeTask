import React from 'react'

const FirstPageButton = ({ onFirstPageClick }) => {
    return (
    <button 
        onClick={onFirstPageClick}
        className="bg-white b hover-gray pa2 br2 pointer br2" 
        title="FirstPage">
        1
    </button> 
    );
}

export default FirstPageButton
