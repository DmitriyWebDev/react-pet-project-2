import _ from 'lodash'

export const getDefaultUsers = (users, filtersTypesKeysAssocMap, RecordModel) => {
    const {gender, department, city} = filtersTypesKeysAssocMap
    return users.map((user, index, array) => {
        return RecordModel({
            ...user,
            // custom data fields
            _addressFull: `${user.address.city}, ${user.address.street}`,
            // custom sort fields
            [gender]: user.gender,
            [department]: user.department,
            [city]: user.address.city
        })
    })
}

export const getFiltersValuesTypesAssocMap = (genderValues, departmentValues, cityValues) => {
    const result = {}

    for(let i = 0; i < genderValues.length; i++) {
        result[`${genderValues[i]}`] = 'gender'
    }

    for(let i = 0; i < departmentValues.length; i++) {
        result[`${departmentValues[i]}`] = 'department'
    }

    for(let i = 0; i < cityValues.length; i++) {
        result[`${cityValues[i]}`] = 'city'
    }

    return result
}

export const getFiltersOptionsKeysFromUsersData = (users) => {
    const result = {
        genderKeys: [],
        departmentKeys: [],
        cityKeys: []
    }

    const genderKeysObj = {}
    const departmentKeysObj = {}
    const cityKeysObj = {}

    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const { gender, department, address } = user

        if (typeof genderKeysObj[`${gender}`] === 'undefined') {
            genderKeysObj[`${gender}`] = ''
            result.genderKeys.push(gender)
        }

        if (typeof departmentKeysObj[`${department}`] === 'undefined') {
            departmentKeysObj[`${department}`] = ''
            result.departmentKeys.push(department)
        }

        const { city } = address
        if (typeof cityKeysObj[`${city}`] === 'undefined') {
            cityKeysObj[`${city}`] = ''
            result.cityKeys.push(city)
        }

    }

    return result
}

export const getUsersCountByFiltersValues = (filtersValues, users) => {
    const filtersValuesMap = {}
    for (let i = 0; i < filtersValues.length; i++) {
        filtersValuesMap[`${filtersValues[i]}`] = 0
    }

    for (let i = 0; i < users.length; i++) {
        const { gender, department, address } = users[i]
        const { city } = address

        filtersValuesMap[`${gender}`]++
        filtersValuesMap[`${department}`]++
        filtersValuesMap[`${city}`]++
    }

    return filtersValuesMap
}

export const getFiltersOptionsForView = (filtersValues, usersCountByFiltersValues, activeFiltersKeys) => {
    const result = {
        genderOptions: [],
        departmentOptions: [],
        cityOptions: []
    }
    const {genderOptions, departmentOptions, cityOptions} = result
    const {genderValues, departmentValues, cityValues} = filtersValues

    getOptions(genderValues, genderOptions)
    getOptions(departmentValues, departmentOptions)
    getOptions(cityValues, cityOptions)

    return result
    
    // utils
    function getOptions(valuesList, optionsList) {
        
        for(let i = 0; i < valuesList.length; i++) {
            const val = valuesList[i]
            const count = usersCountByFiltersValues[`${val}`] ? usersCountByFiltersValues[`${val}`] : 0
            if(!count) continue
            optionsList.push({
                label: val,
                count,
                checked: typeof activeFiltersKeys[`${val}`] !== 'undefined'
            })
        }
    }

}

export const getNewActiveFiltersKeys = (activeFiltersKeys, key) => {
    const result = {...activeFiltersKeys}
    if(typeof result[`${key}`] === 'undefined') {
        result[`${key}`] = ''
    } else {
        delete result[`${key}`]
    }
    return result
}

export const findStringInArray = (arr, str) => {
    const result = {
        existsInArray: false,
        index: null
    }

    for(let i = 0; i < arr.length; i++) {
        if(str === arr[i]) {
            result.existsInArray = true
            result.index = i
            break
        }
    }

    return result
}

export const getArrayWithoutStringIfExists = (arr, str) => {
    const checkData = findStringInArray(arr, str)
    const newArray = arr.slice()
    if(checkData.existsInArray) {        
        newArray.splice(checkData.index, 1)
        return newArray
    } 
     return newArray 
}

export const getFilteredUsers = (users, filters, filterValTypeAssocMap, filterTypeFieldAssocMap) => {     
    
    if (!filters.length) return users

    let result = [...users]

    for (let i = 0; i < filters.length; i++) {
        const filterValue = filters[i]
        const filterField = filterTypeFieldAssocMap[`${filterValTypeAssocMap[`${filterValue}`]}`]        
        result = _.filter(result, { [filterField]: filterValue });
    }

    return result
}

export const getSortedUsers = (users, sortDirection, sortParam) => {
    return _.orderBy(users, [sortParam], [sortDirection]);
}

