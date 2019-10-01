import React from 'react'

const TableHeader = ({ handleSort, columns }) => {
    return (
    <thead>
        <tr>
            {columns.map((header, index) => (
                <th key={index} className="fw6 bb b--black-20  pb3 pr3 bg-white pointer" onClick={handleSort}>{header}</th>
            ))}
        </tr>
    </thead>
    );
}

export default TableHeader;
