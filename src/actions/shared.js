import { getInitialData, _saveQuestionAnswer } from "../utils/api.js";
import { receiveUsers} from "./users.js";
import { receiveQuestions } from "./questions.js";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const AUTHED_ID = "";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setAuthedUser(AUTHED_ID));
            dispatch(hideLoading());
        });
    };
}

export function handleSaveQuestionAnswer({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
            .then(() => dispatch(hideLoading()));
    };
}
