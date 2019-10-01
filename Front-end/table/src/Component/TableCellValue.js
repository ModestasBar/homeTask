import React from 'react'

const TableCellValue = ({ cellValue }) => {
    return (
        <div className="flex mr2">
            <p className="mr2">Cell value:</p>
            <p className="b">{cellValue}</p>
        </div>
    )
}

export default TableCellValue
