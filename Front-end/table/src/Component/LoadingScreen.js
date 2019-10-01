import React from 'react'

const LoadingScreen = ({ currentData, requiredData }) => {

    const percentageValue = (currentData, requiredData) => { 
        return Math.round(currentData.length/requiredData*100);
    }

    return (
        <div>
            <h1>Loading ~{requiredData} rows..{percentageValue(currentData, requiredData)}%</h1>
        </div>
    )
}

export default LoadingScreen
