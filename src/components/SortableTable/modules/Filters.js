import React from 'react'

const Filters = (props) => {
    return (
        <div className="filters-list">

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    Gender
                </div>
                <div className="filters-list__item-options">
                    <label className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            male
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name="gender"
                            type="checkbox"
                            checked={true}
                            onChange={props.handleFilterChange}
                        />
                    </label>
                    <label className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            female
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name="gender"
                            type="checkbox"
                            checked={false}
                            onChange={props.handleFilterChange}
                        />
                    </label>
                </div>
            </div>

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    department
                </div>
                <div className="filters-list__item-options">
                    <label className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            Backend
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name="department"
                            type="checkbox"
                            checked={true}
                            onChange={props.handleFilterChange}
                        />
                    </label>
                    <label className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            Frontend
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name="department"
                            type="checkbox"
                            checked={false}
                            onChange={props.handleFilterChange}
                        />
                    </label>
                </div>
            </div>

            <div className="filters-list__item">
                <div className="filters-list__item-title">
                    city
                </div>
                <div className="filters-list__item-options">
                    <label className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            New-York
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name="gender"
                            type="checkbox"
                            checked={true}
                            onChange={props.handleFilterChange}
                        />
                    </label>
                    <label className="filters-list__item-option">
                        <div className="filters-list__item-option-name">
                            Moscow
                        </div>
                        <input
                            className="filters-list__item-option-input"
                            name="gender"
                            type="checkbox"
                            checked={false}
                            onChange={props.handleFilterChange}
                        />
                    </label>
                </div>
            </div>
            
        </div>

    )
}

export default Filters