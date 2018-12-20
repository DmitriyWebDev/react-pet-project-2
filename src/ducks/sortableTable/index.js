import {
  START, SUCCESS, FAIL
} from '../../constants-common'
import {
  getDefaultUsers,
  getFiltersOptionsKeysFromUsersData,
  getUsersCountByFiltersValues,
  getFiltersOptionsForView,
  getNewActiveFiltersKeys,
  getArrayWithoutStringIfExists,
  getFiltersValuesTypesAssocMap,
  getFilteredUsers
} from './utils'

// Actions
const LOAD_USERS = 'app/sortable-table/LOAD_USERS'
const CHANGE_FILTER = 'app/sortable-table/CHANGE_FILTER'

// State
const defaultState = {
  usersLoading: false,
  usersLoaded: false,
  defaultUsers : [
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
  ],
  users: [],
  usersCountByFiltersAssocMap: {},
  //filters
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
  filtersOptionsForViewGender: [],
  filtersOptionsForViewDepartment: [],
  filtersOptionsForViewCity: [],
}

// Reducer
export default function reducer(state = defaultState, action = {}) {
  //console.log("Reducer")
  //console.log(action)

  const {type, payload} = action
  
  switch (type) {    
    case LOAD_USERS + START: {
      return {
        ...state,
        usersLoading: true,
        usersLoaded: false      
      }
    }      
    case LOAD_USERS + SUCCESS: {
      const {activeFiltersKeys, filtersTypesKeysAssocMap} = state 
      const {users} = payload
      const {
        genderKeys, departmentKeys, cityKeys
      } = getFiltersOptionsKeysFromUsersData(users)
      const usersCountByFiltersAssocMap = getUsersCountByFiltersValues(
        genderKeys.concat(departmentKeys, cityKeys), users
      )  
      const {genderOptions, departmentOptions, cityOptions} = getFiltersOptionsForView(
        {
          genderValues: genderKeys,
          departmentValues: departmentKeys,
          cityValues: cityKeys
        },
        usersCountByFiltersAssocMap,
        activeFiltersKeys
      )
    
      return {
        ...state,
        usersLoading: false,
        usersLoaded: true,
        defaultUsers: getDefaultUsers(users, filtersTypesKeysAssocMap),
        users: getDefaultUsers(users, filtersTypesKeysAssocMap),
        usersCountByFiltersAssocMap,
        filtersOptionsKeysGender: [].concat(genderKeys),
        filtersOptionsKeysDepartment: [].concat(departmentKeys),
        filtersOptionsKeysCity: [].concat(cityKeys),
        filtersValuesTypesAssocMap: getFiltersValuesTypesAssocMap(genderKeys, departmentKeys, cityKeys),
        filtersOptionsForViewGender: [].concat(genderOptions),
        filtersOptionsForViewDepartment: [].concat(departmentOptions),
        filtersOptionsForViewCity: [].concat(cityOptions)
      }
    }    
    case LOAD_USERS + FAIL: {
      return state
    }      
    case CHANGE_FILTER: {
      
      const {filter, filterType} = payload
      const {
        activeFiltersKeys,        
        filtersOptionsKeysGender,
        filtersOptionsKeysDepartment,
        filtersOptionsKeysCity,
        filtersValuesTypesAssocMap,
        filtersTypesKeysAssocMap,
        activeFiltersOrderedList,     
        defaultUsers
      } = state
    
      const newActiveFiltersKeys = getNewActiveFiltersKeys(activeFiltersKeys, filter)    
      let newActiveFiltersOrderedList = getArrayWithoutStringIfExists(activeFiltersOrderedList, filter)

      if(newActiveFiltersOrderedList.length === activeFiltersOrderedList.length) {
        newActiveFiltersOrderedList = [
          ...getArrayWithoutStringIfExists(activeFiltersOrderedList, filter),
          filter
        ] 
      }   
      
      let filteredUsers = defaultUsers

      if(newActiveFiltersOrderedList.length) {
        filteredUsers = getFilteredUsers(
          defaultUsers, newActiveFiltersOrderedList,
          filtersValuesTypesAssocMap, filtersTypesKeysAssocMap
        )
      }

      console.log('filteredUsers')
      console.log(filteredUsers)

      const {
        genderKeys, departmentKeys, cityKeys
      } = getFiltersOptionsKeysFromUsersData(filteredUsers)

      const usersCountByFiltersAssocMap = getUsersCountByFiltersValues(
        genderKeys.concat(departmentKeys, cityKeys), filteredUsers
      )  
    
      const {genderOptions, departmentOptions, cityOptions} = getFiltersOptionsForView(
        {
          genderValues: filtersOptionsKeysGender,
          departmentValues: filtersOptionsKeysDepartment,
          cityValues: filtersOptionsKeysCity
        },
        usersCountByFiltersAssocMap,
        newActiveFiltersKeys
      )

      console.log('Debug filters ---')  
      console.log(newActiveFiltersOrderedList)
      console.log(filterType)
      console.log(filter)
      console.log(newActiveFiltersKeys) 
      console.log(newActiveFiltersOrderedList)

      return {
        ...state,
        activeFiltersKeys: newActiveFiltersKeys,
        activeFiltersOrderedList: newActiveFiltersOrderedList,
        filtersOptionsForViewGender: [].concat(genderOptions),
        filtersOptionsForViewDepartment: [].concat(departmentOptions),
        filtersOptionsForViewCity: [].concat(cityOptions),
        usersCountByFiltersAssocMap,
        users: filteredUsers
      }
    }      
    default: { return state }
  }
}

// Action Creators
export function loadUsers() {
  return { type: LOAD_USERS + START }
}

export function changeFilter(filterType, filter) {
  return { 
    type: CHANGE_FILTER,
    payload: {filterType, filter} 
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export const requestUsers = store => next => action => {
  const {type, ...rest} = action
  
  if(type !== LOAD_USERS + START) return next(action)

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
