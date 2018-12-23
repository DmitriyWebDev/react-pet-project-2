import React from 'react'
import FIlters from './modules/Filters'
import RowsTitles from './modules/RowsTitles'
import RowsList from './modules/RowsList'
import { connect } from 'react-redux'
import { loadUsers, changeFilter, changeSorting } from '../../ducks/sortableTable/index'
import getModifiedFiltersOptionsAndUsers from '../../ducks/sortableTable/selectors'

class SortableTable extends React.Component {
    constructor(props) {
        super(props)
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        //console.log("componentDidMount")
        //console.log(this.props)
        const {usersLoading, usersLoaded, loadUsers} = this.props
        if(!usersLoading && !usersLoaded) {
            loadUsers()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("componentDidUpdate, ===")
    }

    handleFilterChange(event) {
        const target = event.target
        const {name, value} = target
        this.props.changeFilter(name, value)
    }

    handleSortChange(sortingType) {     
        this.props.changeSorting(sortingType)    
    }

    render() {
        console.log('Render SortableTable ---')
        const {
            users,
            filtersOptions,    
            sortDirection,
            sortParamActive
        } = this.props

        return (
            <div className="table">
                <div className="table__content">

                    <div className="table__filters">
                        <FIlters
                            handleFilterChange={this.handleFilterChange}
                            filtersOptions={filtersOptions}
                        />
                    </div>

                    <div className="table__rows">
                        <RowsTitles
                            handleSortChange={this.handleSortChange}
                            sortDirection={sortDirection}
                            sortParamActive={sortParamActive}
                        />
                        <RowsList users={users} />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {
        usersLoading,
        usersLoaded,         
        sortDirection,
        sortParamActive,
    } = state.sortableTable

    const memoizedData = getModifiedFiltersOptionsAndUsers(state.sortableTable)
    const {users, filtersOptions} = memoizedData

    return {
        usersLoading,
        usersLoaded,           
        sortDirection,
        sortParamActive,
        // memoized data
        users,
        filtersOptions
    };
};


export default connect(
    mapStateToProps,
    {loadUsers, changeFilter, changeSorting},
)(SortableTable)

