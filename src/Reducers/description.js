const reducer = (state = '', action = {}) => {
    switch (action.type) {
        case 'DESCRIPTION':
            return action.payload
        default:
            return state 
    }
}

export default reducer