import { GET_ERRORS } from "../types/errorTypes";

const initialState = {
    errors: [],
}

export default function (state=initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;

        default:
            return state;
    }
}
