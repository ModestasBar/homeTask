import React, { useState, useEffect } from 'react';
import './App.css';
import 'tachyons';
import orderBy from 'lodash/orderBy';
import Content from './Container/Content';

const App = () => {
  const dataAPI = 'http://dummy.restapiexample.com/api/v1/employees';
  const requiredData = 5000;

  let[dummyData, setDummyData] = useState([]);
  let[isLoading, setIsLoading] = useState(true);
  let[sortColumn, setSortColumn] = useState('');
  let[sortOrder, setSortOrder] = useState('desc');
  

  useEffect(() => {
    setIsLoading(true);
    const handleDummyData = () => {
      fetch(dataAPI)
     .then(response => response.json())
     .then(data => {
      setDummyData(dummyData = dummyData.concat(data));
       if(dummyData.length <= requiredData) {
         return handleDummyData();
       }
       setIsLoading(!isLoading);
     })
    }
    handleDummyData();
  }, []);

//Bug: Do not sort all data correct...
  const handleSort = (e) => {
    setSortColumn(sortColumn = e.target.innerText.toLowerCase());
    setSortOrder(sortOrder === 'asc' ? sortOrder = 'desc' :  sortOrder = 'asc')
  };


  return (
    <Content 
      dummyData={orderBy(dummyData, sortColumn, sortOrder)} 
      isLoading={isLoading} 
      handleSort={handleSort}
      requiredData={requiredData}
    />
  );
}

export default App;
