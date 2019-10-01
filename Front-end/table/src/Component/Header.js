import React from 'react'
import TableLegend from './TableComponent/TableLegend';
import PaginationState from '../Container/PaginationState';
import CheckBox from './CheckBox';
import TableCellValue from './TableCellValue';

const Header = ({ dataLength, entriesPerPage, paginate, currentPage, paginationCheck, handlePagination, cellValue }) => {
    return (
    <div className="mw8 pa4 center">
        <div className="flex flex-wrap items-center justify-between">
            <TableLegend 
                dataLength={dataLength} 
            />
            {paginationCheck ? 
            <PaginationState
                totalEntries={dataLength} 
                entriesPerPage={entriesPerPage} 
                paginate={paginate}
                currentPage={currentPage}
            />
            : null}
            <CheckBox 
                checkState={paginationCheck} 
                handlePagination={handlePagination}
            />
        </div>
        <TableCellValue cellValue={cellValue} />
    </div>
    );
}

export default Header;
