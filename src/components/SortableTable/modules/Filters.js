import React from 'react'

const Filters = (props) => {

    const { genderOptions, departmentOptions, cityOptions } = props
    const genderFilters = getFiltersOtions('gender', genderOptions)
    const departmentFilters = getFiltersOtions('department', departmentOptions)
    const cityFilters = getFiltersOtions('city', cityOptions)
        
    return (
        <div className="filters-list">

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    Gender
                </div>
                <div className="filters-list__item-options">
                    {genderFilters}
                </div>
            </div>

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    Department
                </div>
                <div className="filters-list__item-options">
                    {departmentFilters}
                </div>
            </div>

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    City
                </div>
                <div className="filters-list__item-options">
                    {cityFilters}
                </div>
            </div>

        </div>

    )

    // utils

    function getFiltersOtions(optionsName, options) {
        return options.map((item, i) => {
            const { label, count, checked } = item
    
            return <label key={label} className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            {label} ({count})
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name={optionsName}
                            type="checkbox"
                            checked={checked}
                            onChange={props.handleFilterChange}
                            value={label}
                        />
                    </label>
        })
    }  

}

export default Filters