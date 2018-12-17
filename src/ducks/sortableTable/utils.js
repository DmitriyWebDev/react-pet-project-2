export const getDefaultUsers = (users) => {
    return users.map((user, index, array) => {
        return {
            ...user,
            // custom data fields
            _addressFull: `${user.address.city}, ${user.address.street}`,
            // custom sort fields
            _sortGender: user.gender,
            _sortDepartment: user.department,
            _sortCity: user.address.city
        }
    })
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
            optionsList.push({
                label: val,
                count: usersCountByFiltersValues[`${val}`],
                checked: typeof activeFiltersKeys[`${val}`] !== 'undefined'
            })
        }
    }

}

