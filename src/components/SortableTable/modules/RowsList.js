import React from 'react'

const RowsList = (props) => {
    const usersRows = props.users.map((item,i) => {
        const {id, name, age, gender, department, _addressFull} = item

        return <div key={id} className="table-rows-list__item">
                    <div className="table-rows-list__item-cell">
                        {name}
                    </div>
                    <div className="table-rows-list__item-cell">
                        {age}
                    </div>
                    <div className="table-rows-list__item-cell">
                        {gender}
                    </div>
                    <div className="table-rows-list__item-cell">
                        {department}
                    </div>
                    <div className="table-rows-list__item-cell">
                        {_addressFull}
                    </div>
                </div>
    })

    return (
        <div className="table-rows-list">
            {usersRows}
        </div>
    )
}

export default RowsList