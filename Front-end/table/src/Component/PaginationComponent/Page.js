import React from 'react'

const Page = ({ pageRange, currentPage, paginate }) => {
    return pageRange.map((page) => ( 
    <a 
        key={page} 
        className= {`bg-white b hover-gray pa2 bn pointer ma1 ${page === currentPage? 'white bg-blue br2' : ''}`}  
        title={page} 
        onClick={() => paginate(page)}>
        {page}
    </a>
    ));
}

export default Page
