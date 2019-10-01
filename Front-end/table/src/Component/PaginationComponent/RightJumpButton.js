import React from 'react'

const RightJumpButton = ({ onRightJumpClick }) => {
    return (
    <button
        onClick={onRightJumpClick}
        className="bg-white b hover-gray pa2 br2 pointer pointer" 
        title="Jump">
        ...
    </button>
    );
}

export default RightJumpButton
