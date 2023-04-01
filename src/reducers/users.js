import { RECEIVE_USERS, SAVE_USER_ANSWER } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        case SAVE_USER_ANSWER:
            console.log("action stuff", action);
            return {
                ...state,
                ...action.users.users,
            };
        default:
            return state;
    }
}
