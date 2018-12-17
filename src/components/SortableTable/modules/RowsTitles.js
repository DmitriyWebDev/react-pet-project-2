import React from 'react'

const RowsTitles = (props) => {
    const {handleSortChange} = props
    
    return (
        <div className="table-rows-titles">

            <div             
                className="table-rows-titles__item"            
                onClick={()=>handleSortChange('Name')}
            >
                <div className="table-rows-titles__item-value">
                    Name
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className="table-rows-titles__item"            
                onClick={()=>handleSortChange('Age')}
            >
                <div className="table-rows-titles__item-value">
                    Age
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className="table-rows-titles__item"            
                onClick={()=>handleSortChange('Gender')}
            >
                <div className="table-rows-titles__item-value">
                    Gender
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className="table-rows-titles__item"            
                onClick={()=>handleSortChange('Department')}
            >
                <div className="table-rows-titles__item-value">
                    Department
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className="table-rows-titles__item"            
                onClick={()=>handleSortChange('Address')}
            >
                <div className="table-rows-titles__item-value">
                    Address
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

        </div>

    )
}

export default RowsTitles