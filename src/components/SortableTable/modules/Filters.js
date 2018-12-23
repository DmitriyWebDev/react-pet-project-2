import React from 'react'

const Filters = (props) => {

    const { filtersOptions } = props
    const { gender, department, city } = filtersOptions
    const genderFilters = getFiltersOtions('gender', gender)
    const departmentFilters = getFiltersOtions('department', department)
    const cityFilters = getFiltersOtions('city', city)
        
    return (
        <div className="filters-list">

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    Gender
                </div>
                <div className="filters-list__item-options">
                    <div className="filters-list__item-options-content">
                        {genderFilters}
                    </div>                   
                </div>
            </div>

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    Department
                </div>
                <div className="filters-list__item-options">
                    <div className="filters-list__item-options-content">
                        {departmentFilters}
                    </div> 
                   
                </div>
            </div>

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    City
                </div>
                <div className="filters-list__item-options">
                    <div className="filters-list__item-options-content">
                        {cityFilters}
                    </div>                     
                </div>
            </div>

        </div>

    )

    // utils

    function getFiltersOtions(optionsName, options) {
        return options.map((item, i) => {
            const { label, count, checked } = item
    
            return <label key={label} className="filters-list__item-option">
                        <div className="filters-list__item-option-content">                            
                            <input
                                className="filters-list__item-option-input"
                                name={optionsName}
                                type="checkbox"
                                checked={checked}
                                onChange={props.handleFilterChange}
                                value={label}
                            />
                            <div className="filters-list__item-option-name">
                                {label} ({count})
                            </div>
                        </div>                        
                    </label>
        })
    }  

}

export default Filters