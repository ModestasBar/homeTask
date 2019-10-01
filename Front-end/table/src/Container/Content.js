import React, { useState } from 'react';
import Header from '../Component/Header';
import Table from '../Component/Table';
import LoadingScreen from '../Component/LoadingScreen';

const Content = ({ dummyData, isLoading, handleSort, requiredData }) => {
    let[currentPage, setCurrentPage] = useState(1);
    let[entriesPerPage] = useState(10);
    let[paginationCheck, setPaginationCheck] = useState(true);
    let[cellValue, setCellValue] = useState();
    let[clickedRowIndex, setClickedRowIndex] = useState();

    const columns = ['ID', 'Employee_name', 'Employee_salary', 'Employee_age'];
    const dataLength = dummyData.length;
    const lastEntryIndex =  currentPage * entriesPerPage;
    const firstEntryIndex = lastEntryIndex - entriesPerPage;
    let pageEntries = dummyData.slice(firstEntryIndex, lastEntryIndex);
    

    const paginate = (page) => {
        setCurrentPage(page);
        setClickedRowIndex();
        setCellValue()
    }

    const handleRowIndex = (index) => setClickedRowIndex(index);
    const handlePagination = () => setPaginationCheck(!paginationCheck);
    const handleCellValue = (e) => setCellValue(e.target.innerText);

    if(!paginationCheck) pageEntries = dummyData;

    return isLoading ? <LoadingScreen currentData={dummyData} requiredData={requiredData} />
    : (
    <div>
        <Header 
         dataLength={dataLength} 
         entriesPerPage={entriesPerPage} 
         paginate={paginate} 
         currentPage={currentPage} 
         paginationCheck={paginationCheck} 
         handlePagination={handlePagination}
         cellValue={cellValue}
         />
        <Table 
         handleSort={handleSort} 
         columns={columns} 
         pageEntries={pageEntries}
         handleCellValue={handleCellValue}
         clickedRowIndex={clickedRowIndex}
         handleRowIndex={handleRowIndex}
        />
    </div>
    );
}

export default Content;