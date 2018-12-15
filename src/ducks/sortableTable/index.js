// Actions
const LOAD   = 'app/sortable-table/LOAD'
const CREATE = 'app/sortable-table/CREATE'
const UPDATE = 'app/sortable-table/UPDATE'
const REMOVE = 'app/sortable-table/REMOVE'

// Reducer
export default function reducer(state = {"1":"Hello world"}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state
  }
}

// Action Creators
export function loadUsers() {
  return { type: LOAD }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function getUsers () {
  console.log("ok")
  //return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
}
