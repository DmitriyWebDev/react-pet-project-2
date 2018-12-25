import React from 'react'
const classNames = require('classnames');

const RowsTitles = (props) => {
    const {handleSortChange, sortDirection, sortParamActive} = props   

    const nameTitleClass = classNames({
        'table-rows-titles__item': true,
        'table-rows-titles__item_active': sortParamActive === 'name',
        'table-rows-titles__item_asc': sortDirection === 'asc',
        'table-rows-titles__item_desc': sortDirection !== 'asc',
    });

    const nameAgeClass = classNames({
        'table-rows-titles__item': true,
        'table-rows-titles__item_active': sortParamActive === 'age',
        'table-rows-titles__item_asc': sortDirection === 'asc',
        'table-rows-titles__item_desc': sortDirection !== 'asc',
    });

    const nameGenderClass = classNames({
        'table-rows-titles__item': true,
        'table-rows-titles__item_active': sortParamActive === 'gender',
        'table-rows-titles__item_asc': sortDirection === 'asc',
        'table-rows-titles__item_desc': sortDirection !== 'asc',
    });

    const nameDepartmentClass = classNames({
        'table-rows-titles__item': true,
        'table-rows-titles__item_active': sortParamActive === 'department',
        'table-rows-titles__item_asc': sortDirection === 'asc',
        'table-rows-titles__item_desc': sortDirection !== 'asc',
    });

    const nameAddressClass = classNames({
        'table-rows-titles__item': true,
        'table-rows-titles__item_active': sortParamActive === 'address',
        'table-rows-titles__item_asc': sortDirection === 'asc',
        'table-rows-titles__item_desc': sortDirection !== 'asc',
    });
    
    return (
        <div className="table-rows-titles">

            <div             
                className={nameTitleClass}           
                onClick={()=>handleSortChange('name')}
            >
                <div className="table-rows-titles__item-value">
                    Name
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={nameAgeClass}   
                onClick={()=>handleSortChange('age')}
            >
                <div className="table-rows-titles__item-value">
                    Age
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={nameGenderClass}         
                onClick={()=>handleSortChange('gender')}
            >
                <div className="table-rows-titles__item-value">
                    Gender
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={nameDepartmentClass}       
                onClick={()=>handleSortChange('department')}
            >
                <div className="table-rows-titles__item-value">
                    Department
                </div>
                <div className="table-rows-titles__item-btn"></div>
            </div>

            <div             
                className={nameAddressClass}     
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