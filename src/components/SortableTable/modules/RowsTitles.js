import React from 'react'

const RowsTitles = (props) => {
    return (
        <div className="table__rows-titles">
            <div className="table__rows-titles-item">
                <div className="table__rows-titles-item-value">
                    Name
                </div>
                <div className="table__rows-titles-item-btn"></div>
            </div>
            <div className="table__rows-titles-item">
                <div className="table__rows-titles-item-value">
                    Age
                </div>
                <div className="table__rows-titles-item-btn"></div>
            </div>
            <div className="table__rows-titles-item">
                <div className="table__rows-titles-item-value">
                    Gender
                </div>
                <div className="table__rows-titles-item-btn"></div>
            </div>
            <div className="table__rows-titles-item">
                <div className="table__rows-titles-item-value">
                    Department
                </div>
                <div className="table__rows-titles-item-btn"></div>
            </div>
            <div className="table__rows-titles-item">
                <div className="table__rows-titles-item-value">
                    Address
                </div>
                <div className="table__rows-titles-item-btn"></div>
            </div>
        </div>

    )
}

export default RowsTitles