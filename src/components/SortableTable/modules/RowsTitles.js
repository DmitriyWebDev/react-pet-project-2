import React from 'react'

const RowsTitles = (props) => {
    const {handleSortChange, sortDirection, sortParamActive} = props   
    
    return (
        <div className="table-rows-titles">

            <div             
                className={
                    "table-rows-titles__item " 
                    + (sortParamActive === "name" ? "table-rows-titles__item_active " : "")
                    + (sortDirection === "asc" ? "table-rows-titles__item_asc " : "table-rows-titles__item_desc")
                }           
                onClick={()=>handleSortChange('name')}
            >
                <div className="table-rows-titles__item-value">
                    Name
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={
                    "table-rows-titles__item " 
                    + (sortParamActive === "age" ? "table-rows-titles__item_active " : "")
                    + (sortDirection === "asc" ? "table-rows-titles__item_asc " : "table-rows-titles__item_desc")
                }          
                onClick={()=>handleSortChange('age')}
            >
                <div className="table-rows-titles__item-value">
                    Age
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={
                    "table-rows-titles__item " 
                    + (sortParamActive === "gender" ? "table-rows-titles__item_active " : "")
                    + (sortDirection === "asc" ? "table-rows-titles__item_asc " : "table-rows-titles__item_desc")
                }             
                onClick={()=>handleSortChange('gender')}
            >
                <div className="table-rows-titles__item-value">
                    Gender
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={
                    "table-rows-titles__item " 
                    + (sortParamActive === "department" ? "table-rows-titles__item_active " : "")
                    + (sortDirection === "asc" ? "table-rows-titles__item_asc " : "table-rows-titles__item_desc")
                }            
                onClick={()=>handleSortChange('department')}
            >
                <div className="table-rows-titles__item-value">
                    Department
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={
                    "table-rows-titles__item " 
                    + (sortParamActive === "address" ? "table-rows-titles__item_active " : "")
                    + (sortDirection === "asc" ? "table-rows-titles__item_asc " : "table-rows-titles__item_desc")
                }          
                onClick={()=>handleSortChange('address')}
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