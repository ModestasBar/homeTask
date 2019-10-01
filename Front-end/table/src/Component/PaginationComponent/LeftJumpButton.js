import React from 'react'

const LeftJumpButton = ({ onLeftJumpClick }) => {
    return (
    <button
        onClick={onLeftJumpClick}
        className="bg-white b hover-gray pa2 br2 pointer pointer" 
        title="Jump">
        ...
    </button>
    );
}

export default LeftJumpButton;
