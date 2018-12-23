import { Record } from 'immutable'
import {
  START, SUCCESS, FAIL
} from '../../constants-common'
import {
  getDefaultUsers,
  getFiltersOptionsKeysFromUsersData,
  getNewActiveFiltersKeys,
  getArrayWithoutStringIfExists,
  getFiltersValuesTypesAssocMap
} from './utils'

// Actions
const LOAD_USERS = 'app/sortable-table/LOAD_USERS'
const CHANGE_FILTER = 'app/sortable-table/CHANGE_FILTER'
const CHANGE_SORT = 'app/sortable-table/CHANGE_SORT'

// State
const UserRecord = Record({
  id: -1,
  name: "",
  age: 0,
  gender: "",
  department: "",
  address: {
    city: "",
    street: ""
  }, 
  _addressFull: "",  
  _sortGender: "",
  _sortDepartment: "",
  _sortCity: ""
})

const ReducerRecord = Record({
  usersLoading: false,
  usersLoaded: false,
  defaultUsers: [],
  // filters
  activeFiltersKeys: {},
  activeFiltersOrderedList: [],
  filtersTypesKeysAssocMap: {
    gender: '_sortGender',
    department: '_sortDepartment',
    city: '_sortCity'
  },
  filtersOptionsKeysGender: [],
  filtersOptionsKeysDepartment: [],
  filtersOptionsKeysCity: [],
  filtersValuesTypesAssocMap: {},
  // sorting
  sortDirection: 'asc',
  sortParamActive: null,
  sortValuesKeysAssocMap: {
    name: 'name',
    age: 'age',
    gender: 'gender',
    department: 'department',
    address: '_addressFull'
  }
})

const defaultState = new ReducerRecord()

// Reducer
export default function reducer(state = defaultState, action = {}) {

  const { type, payload } = action

  switch (type) {
    case LOAD_USERS + START: {
      return state
        .set('usersLoading', true)
        .set('usersLoaded', false)
    }
    case LOAD_USERS + SUCCESS: {
      const { filtersTypesKeysAssocMap } = state
      const { users } = payload
      const {
        genderKeys, departmentKeys, cityKeys
      } = getFiltersOptionsKeysFromUsersData(users)

      return state
        .set('usersLoading', false)
        .set('usersLoaded', true)
        .set('defaultUsers', getDefaultUsers(users, filtersTypesKeysAssocMap, UserRecord))
        .set('filtersOptionsKeysGender', [].concat(genderKeys))
        .set('filtersOptionsKeysDepartment', [].concat(departmentKeys))
        .set('filtersOptionsKeysCity', [].concat(cityKeys))
        .set('filtersValuesTypesAssocMap', getFiltersValuesTypesAssocMap(genderKeys, departmentKeys, cityKeys))     
    }
    case LOAD_USERS + FAIL: {
      return state
    }
    case CHANGE_FILTER: {

      const { filter } = payload
      const {
        activeFiltersKeys,
        activeFiltersOrderedList
      } = state

      const newActiveFiltersKeys = getNewActiveFiltersKeys(activeFiltersKeys, filter)
      let newActiveFiltersOrderedList = getArrayWithoutStringIfExists(activeFiltersOrderedList, filter)

      if (newActiveFiltersOrderedList.length === activeFiltersOrderedList.length) {
        newActiveFiltersOrderedList = [
          ...getArrayWithoutStringIfExists(activeFiltersOrderedList, filter),
          filter
        ]
      }

      return state
        .set('activeFiltersKeys', newActiveFiltersKeys)
        .set('activeFiltersOrderedList', newActiveFiltersOrderedList)
    }
    case CHANGE_SORT: {
      const { sortingType } = payload
      const { sortDirection, sortParamActive } = state

      let newSortDirection = sortDirection

      if (sortParamActive !== null && sortingType === sortParamActive) {
        newSortDirection = (sortDirection === 'asc') ? 'desc' : 'asc'
      }

      return state
        .set('sortDirection', newSortDirection)
        .set('sortParamActive', sortingType)
    }
    default: { return state }
  }
}

// Action Creators
export function changeFilter(filterType, filter) {
  return {
    type: CHANGE_FILTER,
    payload: { filterType, filter }
  }
}

export function changeSorting(sortingType) {
  return {
    type: CHANGE_SORT,
    payload: { sortingType }
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function loadUsers() {  
  return function(dispatch) {
    dispatch({ type: LOAD_USERS + START })

    const urlGetUsers = 'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json'
    
    setTimeout(() => { // timeout 1 second for Loader show demonstration
      fetch(urlGetUsers)
      .then(function (response) {
        return response.json()
      })
      .then(function (users) {
        dispatch({ type: LOAD_USERS + SUCCESS, payload: { users } })
      })
      .catch(function (error) {
        dispatch({ type: LOAD_USERS + FAIL, error })
      })
    }, 1000)
    
  }
}
