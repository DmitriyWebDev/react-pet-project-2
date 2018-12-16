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