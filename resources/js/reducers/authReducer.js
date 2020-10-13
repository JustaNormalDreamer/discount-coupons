import {GET_PROFILE, PROFILE_LOADING} from "../types/authTypes";

const initialState = {
    user: null,
    loading: false
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }

        case PROFILE_LOADING:
            return {
                ...state,
                loading: true,
            }

        default:
            return state;
    }
}
