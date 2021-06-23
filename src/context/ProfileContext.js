import createDataContext from './createDataContext';

const profileReducer = (state, action) => {
    switch (action.type) {
        case 'changeProfile':
            return {...state, profileId: action.payload}
        default:
            return state;
    }
}

const changeProfile = dispatch => async () => {
    dispatch({type: 'change', payload: "aaa"})
}

export const {Provider, Context} = createDataContext(
    profileReducer,
    {
        changeProfile
    },
    {
        profileId: null
    }
)