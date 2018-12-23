import { createSelector } from 'reselect'
import {
    getFiltersOptionsKeysFromUsersData,
    getUsersCountByFiltersValues,
    getFiltersOptionsForView,
    getFilteredUsers,
    getSortedUsers
} from './utils'

const getDefaultUsers = (state) => {
    return state.defaultUsers
}

const getActiveFiltersKeys = (state) => {
    return state.activeFiltersKeys
}

const getFiltersValuesTypesAssocMap = (state) => {
    return state.filtersValuesTypesAssocMap
}

const getFiltersTypesKeysAssocMap = (state) => {
    return state.filtersTypesKeysAssocMap
}

const getActiveFiltersOrderedList = (state) => {
    return state.activeFiltersOrderedList
}

const getSortDirection = (state) => {
    return state.sortDirection
}

const getSortParamActive = (state) => {
    return state.sortParamActive
}

const getSortValuesKeysAssocMap = (state) => {
    return state.sortValuesKeysAssocMap
}

const getFiltersOptionsKeysGender = (state) => {
    return state.filtersOptionsKeysGender
}

const getFiltersOptionsKeysDepartment = (state) => {
    return state.filtersOptionsKeysDepartment
}

const getFiltersOptionsKeysCity = (state) => {
    return state.filtersOptionsKeysCity
}


export const getModifiedFiltersOptionsAndUsers = createSelector(
    // first argument
    [
        getDefaultUsers, getActiveFiltersKeys,
        getFiltersValuesTypesAssocMap, getFiltersTypesKeysAssocMap, getActiveFiltersOrderedList,
        getSortDirection, getSortParamActive, getSortValuesKeysAssocMap,
        getFiltersOptionsKeysGender, getFiltersOptionsKeysDepartment, getFiltersOptionsKeysCity
    ],
    // last argument
    (
        defaultUsers, activeFiltersKeys,
        filtersValuesTypesAssocMap, filtersTypesKeysAssocMap, activeFiltersOrderedList,
        sortDirection, sortParamActive, sortValuesKeysAssocMap,
        filtersOptionsKeysGender, filtersOptionsKeysDepartment, filtersOptionsKeysCity
    ) => {
               
        // compute users

        let filteredSortedUsers = [...defaultUsers]

        if (activeFiltersOrderedList.length) {
            filteredSortedUsers = getFilteredUsers(
                defaultUsers, activeFiltersOrderedList,
                filtersValuesTypesAssocMap, filtersTypesKeysAssocMap
            )
        } 

        if (sortParamActive !== null) {
            const sortParam = sortValuesKeysAssocMap[`${sortParamActive}`]
            filteredSortedUsers = getSortedUsers(filteredSortedUsers, sortDirection, sortParam)
        }

        // compute filters options

        const {
            genderKeys, departmentKeys, cityKeys
        } = getFiltersOptionsKeysFromUsersData(filteredSortedUsers)

        const usersCountByFiltersAssocMap = getUsersCountByFiltersValues(
            genderKeys.concat(departmentKeys, cityKeys), filteredSortedUsers
        )
    
        const { genderOptions, departmentOptions, cityOptions } = getFiltersOptionsForView(
            {
                genderValues: filtersOptionsKeysGender,
                departmentValues: filtersOptionsKeysDepartment,
                cityValues: filtersOptionsKeysCity
            },
            usersCountByFiltersAssocMap,
            activeFiltersKeys
        )

        return {
            users: filteredSortedUsers,
            filtersOptions: {
                gender: genderOptions,
                department: departmentOptions,
                city: cityOptions
            }
        }
    }
)

export default getModifiedFiltersOptionsAndUsers
