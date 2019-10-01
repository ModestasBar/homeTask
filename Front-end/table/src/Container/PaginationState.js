import React, { useState, useEffect } from 'react'
import Page from '../Component/PaginationComponent/Page';
import LeftHelperButtons from '../Component/PaginationComponent/LeftHelperButtons';
import RightHelperButtons from '../Component/PaginationComponent/RightHelperButtons';

const PaginationState = ({ totalEntries, entriesPerPage, paginate, currentPage }) => {

    //Visible pagination page array
    const[pageRange, setPageRange] = useState([]);
    const visibleDistance = 8;

    //Helper variable to determinate first and last index values in rendered pages
    let[rangeIndex, setRangeIndex] = useState(0);

    //Distance of base jump
    let[leftJumpLength, setLeftJumpLength] = useState(visibleDistance);
    let[rightJumpLength, setRightJumpLength] = useState(visibleDistance);


    //Total pages array
    const totalPaginationPage = [];

    //First and last index values of visible pages 
    let firstPageIndex = rangeIndex;
    let lastPageIndex = visibleDistance + rangeIndex;
    
    //Base visible pages array to render 
    useEffect(() => {
        setPageRange(totalPaginationPage.slice(firstPageIndex, lastPageIndex));
    }, []);

    //Create pagination pages
    for(let i = 1; i <=  Math.ceil(totalEntries / entriesPerPage); i++) {
        totalPaginationPage.push(i);
    };

    const totalLength = totalPaginationPage.length;


    const onNextClick = () => {
        if(currentPage < totalLength) {
            if(currentPage >= lastPageIndex) {
                setPageRange(totalPaginationPage.slice(++firstPageIndex, ++lastPageIndex));
                setRangeIndex(++rangeIndex);
            };
            paginate(++currentPage);
        };
    };

    const onPrevClick = () => {
        if(currentPage > 1) {
            paginate(--currentPage);
            if(currentPage <= firstPageIndex) {
                setPageRange(totalPaginationPage.slice(--firstPageIndex, --lastPageIndex));
                setRangeIndex(--rangeIndex);
            };
        };
    };

    //Helper function to reset base jump distance
    const resetJumpDistance = () => {
        setLeftJumpLength(leftJumpLength = visibleDistance);
        setRightJumpLength(rightJumpLength = visibleDistance);
    }

    const onFirstPageClick = () => {
        setPageRange(totalPaginationPage.slice(0, visibleDistance));
        setRangeIndex(rangeIndex = 0);
        resetJumpDistance();
        paginate(1);
    }; 

    const onLastPageClick = () => {
        setPageRange(totalPaginationPage.slice(totalLength - visibleDistance,  totalLength));
        setRangeIndex(rangeIndex = totalLength - visibleDistance);
        resetJumpDistance();
        paginate(totalLength);
    };

    const onLeftJumpClick = () => {
        setRightJumpLength(rightJumpLength = visibleDistance);
        if(firstPageIndex > 0 && leftJumpLength < rangeIndex) {
            setPageRange(totalPaginationPage.slice(firstPageIndex - leftJumpLength, lastPageIndex - leftJumpLength))
            setRangeIndex(rangeIndex-=leftJumpLength);
            setLeftJumpLength(leftJumpLength += visibleDistance);
        } else {
            setPageRange(totalPaginationPage.slice(0, visibleDistance));
            setRangeIndex(rangeIndex = 0);
            setLeftJumpLength(leftJumpLength = visibleDistance);
        }
    };

    const onRightJumpClick = () => {
        setLeftJumpLength(leftJumpLength = visibleDistance);
        if(lastPageIndex < totalLength && rangeIndex+rightJumpLength < totalLength) {
            setPageRange(totalPaginationPage.slice(firstPageIndex + rightJumpLength, lastPageIndex + rightJumpLength))
            setRangeIndex(rangeIndex += rightJumpLength);
            setRightJumpLength(rightJumpLength += visibleDistance);
        } else {
            setPageRange(totalPaginationPage.slice(totalLength - visibleDistance,  totalLength));
            setRangeIndex(rangeIndex = totalLength - visibleDistance);
            setRightJumpLength(rightJumpLength = visibleDistance);
        }
    };

    return (
    <nav className="pb1 pb2-ns f7" data-name="pagination-numbers">
        <LeftHelperButtons 
            firstPageIndex={firstPageIndex}
            onFirstPageClick={onFirstPageClick} 
            onLeftJumpClick={onLeftJumpClick}
            onPrevClick={onPrevClick}
        />
        <Page 
            pageRange={pageRange} 
            currentPage={currentPage} 
            paginate={paginate}
        />
        <RightHelperButtons 
            lastPageIndex={lastPageIndex} 
            totalLength={totalLength}
            onLastPageClick={onLastPageClick}
            onNextClick={onNextClick}
            onRightJumpClick={onRightJumpClick}
        />
    </nav>  
    );
}

export default PaginationState
