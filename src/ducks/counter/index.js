// Actions
export const INCREMENT = 'app/counter/INCREMENT'

// State
const defaultState = {
    count: 0
}

// Reducer
export default function reducer(state = defaultState, action = {}) {
    const { type } = action

    switch (type) {
        case INCREMENT: {
            const {count} = state
            return {
                ...state,
                count: count + 1
            }
        }
        default: { return state }
    }

}

// Action creators
export const increment = () => {
    return {
        type: INCREMENT
    }
}