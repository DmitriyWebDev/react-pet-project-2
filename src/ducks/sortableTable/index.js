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
  getFilteredUsers,
  getSortedUsers
} from './utils'

// Actions
const LOAD_USERS = 'app/sortable-table/LOAD_USERS'
const CHANGE_FILTER = 'app/sortable-table/CHANGE_FILTER'
const CHANGE_SORT = 'app/sortable-table/CHANGE_SORT'

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
  filtersOptionsForViewGender: [],
  filtersOptionsForViewDepartment: [],
  filtersOptionsForViewCity: [],
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
      
      const {filter} = payload
      const {
        activeFiltersKeys,        
        filtersOptionsKeysGender,
        filtersOptionsKeysDepartment,
        filtersOptionsKeysCity,
        filtersValuesTypesAssocMap,
        filtersTypesKeysAssocMap,
        activeFiltersOrderedList,     
        defaultUsers,
        // sorting
        sortDirection,
        sortParamActive,
        sortValuesKeysAssocMap
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
    
      let filteredSortedUsers = filteredUsers

      if(sortParamActive !== null) {
        const sortParam = sortValuesKeysAssocMap[`${sortParamActive}`]        
        filteredSortedUsers = getSortedUsers(filteredSortedUsers, sortDirection, sortParam)
      }

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
    
      return {
        ...state,
        activeFiltersKeys: newActiveFiltersKeys,
        activeFiltersOrderedList: newActiveFiltersOrderedList,
        filtersOptionsForViewGender: [].concat(genderOptions),
        filtersOptionsForViewDepartment: [].concat(departmentOptions),
        filtersOptionsForViewCity: [].concat(cityOptions),
        usersCountByFiltersAssocMap,
        users: filteredSortedUsers
      }
    }    
    case CHANGE_SORT: {
      const {sortingType} = payload
      const {users, sortDirection, sortParamActive, sortValuesKeysAssocMap} = state
      
      let newSortDirection = sortDirection
      
      if(sortParamActive !== null && sortingType === sortParamActive) {
        newSortDirection = (sortDirection === 'asc') ? 'desc' : 'asc'
      } 

      const sortParam = sortValuesKeysAssocMap[`${sortingType}`]     
      const sortedUsers = getSortedUsers(users, newSortDirection, sortParam)

      return {
        ...state,
        users: sortedUsers,
        sortDirection: newSortDirection,
        sortParamActive: sortingType,        
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

export function changeSorting(sortingType) {
  return { 
    type: CHANGE_SORT,
    payload: {sortingType} 
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
