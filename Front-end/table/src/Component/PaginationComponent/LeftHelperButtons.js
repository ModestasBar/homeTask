import React from 'react'
import FirstPageButton from './FirstPageButton';
import PreviousButton from './PreviousButton';
import LeftJumpButton from './LeftJumpButton';

const LeftHelperButtons = ({ onFirstPageClick, onPrevClick, onLeftJumpClick, firstPageIndex }) => {
    return (
    firstPageIndex > 0 
    ? <div className="dib">
    <FirstPageButton onFirstPageClick={onFirstPageClick} />
    <PreviousButton onPrevClick={onPrevClick}/>
    <LeftJumpButton onLeftJumpClick={onLeftJumpClick} />
    </div>
    : <PreviousButton onPrevClick={onPrevClick}/>
    );
}

export default LeftHelperButtons;
