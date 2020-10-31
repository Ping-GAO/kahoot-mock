import { alertConstants } from "../actionTypes";

const alert = (state = {}, action) => {
    switch (action.type) {
    case alertConstants.SUCCESS:
        return {
            type: 'alert-success',
            message: action.message
        };
    case alertConstants.ERROR:
        return {
            type: 'alert-danger',
            message: action.message
        };
    default:
        return state
    }
}

export default alert;