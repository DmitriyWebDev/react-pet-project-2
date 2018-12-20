import React from 'react'
import FIlters from './modules/Filters'
import RowsTitles from './modules/RowsTitles'
import RowsList from './modules/RowsList'
import { connect } from "react-redux";
import { loadUsers, changeFilter } from "../../ducks/sortableTable/index";

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
        const target = event.target;
        const {name, value} = target
        this.props.changeFilter(name, value)
    }

    handleSortChange(sortType) {
        console.log("handleSortChange()", '---')
        console.log(sortType)    
    }

    render() {

        const {
            users,
            filtersOptionsForViewGender,
            filtersOptionsForViewDepartment,
            filtersOptionsForViewCity
        } = this.props

        return (
            <div className="table">
                <div className="table__content">

                    <div className="table__filters">
                        <FIlters
                            handleFilterChange={this.handleFilterChange}
                            genderOptions={filtersOptionsForViewGender}
                            departmentOptions={filtersOptionsForViewDepartment}
                            cityOptions={filtersOptionsForViewCity}
                        />
                    </div>

                    <div className="table__rows">
                        <RowsTitles handleSortChange={this.handleSortChange}/>
                        <RowsList users={users} />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {
        usersLoading, usersLoaded, users,
        filtersOptionsForViewGender,
        filtersOptionsForViewDepartment,
        filtersOptionsForViewCity,
    } = state.sortableTable
    return {
        usersLoading,
        usersLoaded,
        users,
        filtersOptionsForViewGender,
        filtersOptionsForViewDepartment,
        filtersOptionsForViewCity,
    };
};


export default connect(
    mapStateToProps,
    {loadUsers, changeFilter},
)(SortableTable);

