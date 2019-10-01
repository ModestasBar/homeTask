import React, { useState } from 'react'
import TableHeader from './TableComponent/TableHeader';
import TableEntry from './TableComponent/TableEntry';

const Table = ({ handleSort, columns, pageEntries, handleCellValue, clickedRowIndex, handleRowIndex }) => {

    return (
    <div className="mw8 ph4 center">
        <table className="f6 mw8 w-100 ">
            <TableHeader handleSort={handleSort } columns={columns}/> 
            <tbody className="lh-copy center">
                {pageEntries.map((entry, index) => (
                    <TableEntry
                        key={index} 
                        tableData={entry} 
                        handleCellValue={handleCellValue}
                        handleRowIndex={handleRowIndex}
                        rowIndex={index}
                        clickedRowIndex={clickedRowIndex}
                    />
                ))}
            </tbody>
        </table> 
    </div>
    );
}

export default Table;
