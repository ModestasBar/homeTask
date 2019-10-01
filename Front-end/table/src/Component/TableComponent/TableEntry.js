import React from 'react';

const TableEntry = ({ tableData, handleCellValue, handleRowIndex, rowIndex, clickedRowIndex }) => {

    return (
    <tr className={rowIndex === clickedRowIndex? 'bg-blue': 'bg-white'} onClick={() => handleRowIndex(rowIndex)}>
        <td className="pv3 pr3 bb tc b--black-20 tc center pointer" onClick={handleCellValue}>{tableData.id}</td>
        <td className="pv3 pr3 bb tc b--black-20 pointer" onClick={handleCellValue}>{tableData.employee_name}</td>
        <td className="pv3 pr3 bb tc b--black-20 pointer" onClick={handleCellValue}>{tableData.employee_salary}</td>
        <td className="pv3 pr3 bb tc b--black-20 pointer" onClick={handleCellValue}>{tableData.employee_age}</td>
    </tr>
    );
}

export default TableEntry;