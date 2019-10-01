import React from 'react'
import RightJumpButton from './RightJumpButton';
import NextButton from './NextButton';
import LastPageButton from './LastPageButton';

const RightHelperButtons = ({ lastPageIndex, totalLength, onLastPageClick, onNextClick, onRightJumpClick }) => {
    return (
    lastPageIndex < totalLength
    ? <div className="dib">
    <RightJumpButton onRightJumpClick={onRightJumpClick} />
    <NextButton onNextClick={onNextClick} />
    <LastPageButton totalLength={totalLength} onLastPageClick={onLastPageClick} />
    </div> 
    : <NextButton onNextClick={onNextClick} />
    );
}

export default RightHelperButtons;
