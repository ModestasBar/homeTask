import React from 'react'

const LastPageButton = ({ onLastPageClick, totalLength }) => {
    return (
    <button 
        onClick={onLastPageClick}
        className="bg-white b hover-gray pa2 br2 pointer active" 
        title="LastPage">
    {totalLength}
    </button>
    );
}

export default LastPageButton
