export const initialState = {
    current_user: {},
    user_bio: {},
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                current_user: action.user
            }
        case 'SET_BIO':
            return {
                ...state,
                user_bio: action.bio
            }
        
        default:
            return state
    }
}

export default reducer