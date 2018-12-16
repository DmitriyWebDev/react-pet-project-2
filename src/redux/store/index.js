import { createStore, applyMiddleware } from "redux"
import rootReducer from "../reducer"
import {requestUsers} from '../../ducks/sortableTable/index'

const store = createStore(
    rootReducer,
    applyMiddleware(requestUsers)
)

window.store = store

export default store