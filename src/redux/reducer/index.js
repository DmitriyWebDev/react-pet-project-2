import { combineReducers } from 'redux'
import sortableTable from '../../ducks/sortableTable'
import counter from '../../ducks/counter'

const rootReducer = combineReducers({
    sortableTable,
    counter
});
export default rootReducer;