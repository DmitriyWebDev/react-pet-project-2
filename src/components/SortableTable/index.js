import React from 'react'
import FIlters from './modules/Filters'
import RowsTitles from './modules/RowsTitles'
import RowsList from './modules/RowsList'
import { connect } from "react-redux";
import { loadUsers } from "../../ducks/sortableTable/index";

class SortableTable extends React.Component {
    constructor(props) {
        super(props)
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount")
        console.log(this.props)
        const {usersLoading, usersLoaded, loadUsers} = this.props
        if(!usersLoading && !usersLoaded) {
            loadUsers()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate, ===")
    }

    handleFilterChange(event) {
        console.log("handleFilterChange()", '---')
    }

    handleSortChange(event) {
        console.log("handleSortChange()", '---')
    }

    render() {
        const {users} = this.props
        return (
            <div className="table">
                <div className="table__content">

                    <div className="table__filters">
                        <FIlters handleFilterChange={this.handleFilterChange} />
                    </div>

                    <div className="table__rows">
                        <RowsTitles />
                        <RowsList users={users} />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    const {usersLoading, usersLoaded, users} = state.sortableTable
    return {
        usersLoading,
        usersLoaded,
        users
    };
};


export default connect(
    mapStateToProps,
    {loadUsers},
)(SortableTable);

