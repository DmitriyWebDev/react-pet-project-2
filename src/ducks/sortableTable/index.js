import {
  START, SUCCESS, FAIL
} from '../../constants-common'
import {getDefaultUsers} from './utils'

// Actions
const LOAD_USERS = 'app/sortable-table/LOAD_USERS'

// State
let defaultUsers = [
  // {
  //   id: "573f358cbd70b5b843a2d624",
  //   name: "Mendez",
  //   age: 30,
  //   gender: "male",
  //   department: "Backend",
  //   address: {
  //     city: "Moscow",
  //     street: "Fayette Street 923"
  //   },
  //   // custom data fields
  //   _addressFull: "Moscow, Fayette Street 923",
  //   // custom sort fields
  //   _sortGender: "male",
  //   _sortDepartment: "Backend",
  //   _sortCity: "Moscow"
  // },
]

const defaultState = {
  usersLoading: false,
  usersLoaded: false,
  users: []
}

// Reducer
export default function reducer(state = defaultState, action = {}) {
  console.log("Reducer")
  console.log(action)

  const {type, payload} = action
  
  switch (type) {
    case LOAD_USERS + START:
      return {
        ...state,
        usersLoading: true,
        usersLoaded: false      
      }
    case LOAD_USERS + SUCCESS:    
      defaultUsers = getDefaultUsers(payload.users)
  
      return {
        ...state,
        usersLoading: false,
        usersLoaded: true,
        users: getDefaultUsers(payload.users)
      }
    case LOAD_USERS + FAIL:
      return state
    default: return state
  }
}

// Action Creators
export function loadUsers() {
  return { type: LOAD_USERS + START }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getUsers () {
//   console.log("getUsers Middleware", "---")
//   //return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }

export const requestUsers = store => next => action => {
  console.log("Middleware - requestUsers()", '---')
  console.log(action)
  const {type, ...rest} = action
  next(action)

  const urlGetUsers = 'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json'
  
  fetch(urlGetUsers)
      .then(function (response) {
          return response.json()
      })
      .then(function (users) {    
          next({...rest, type: LOAD_USERS + SUCCESS, payload: {users} })
      })
      .catch(function (error) {
              next({...rest, type: LOAD_USERS + FAIL, error})
      })
}
