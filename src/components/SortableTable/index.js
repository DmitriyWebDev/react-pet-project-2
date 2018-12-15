import React from 'react'
import FIlters from './modules/Filters'
import RowsTitles from './modules/RowsTitles'
import RowsList from './modules/RowsList'

class SortableTable extends React.Component {
    constructor(props) {
        super(props)
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        const urlGetUsers = 'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json'
        // console.log(urlGetUsers)

        // fetch(urlGetUsers)
        //     .then(function (response) {
        //         console.log(response)
        //         return response.json()
        //     })
        //     .then(function (usersList) {
        //         console.log(usersList)
        //     })
        //     .catch(alert)
    }

    handleFilterChange(event) {
        console.log("handleFilterChange()", '---')
     }

    handleSortChange(event) {
        console.log("handleSortChange()", '---')
    }

    render() {
        return (
            <div className="table">
                <div className="table__content">

                    <div className="table__filters">
                        <FIlters handleFilterChange={this.handleFilterChange}/>
                    </div>

                    <div className="table__rows">
                        <RowsTitles />
                        <RowsList />        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SortableTable