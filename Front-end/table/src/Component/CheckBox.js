import React from 'react'

const CheckBox = ({ checkState, handlePagination }) => {
    
    return (
    <div className="mv2 flex items-center  dib">
        <input 
            className="mr2 pointer" 
            type="checkbox"
            id="pagination" 
            value="pagination"
            checked={checkState}
            onChange={handlePagination}
        />
        <label htmlFor="pagination" className="lh-copy">Pagination</label>
    </div>
    );
}

export default CheckBox
