import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import "../../src/index.css";
import React from "react";

const LoginPage = ({ userValues, dispatch, authedUser }) => {
    const navigate = useNavigate();

    const handleOnChangeUser = (e) => {
        e.preventDefault();
        const redirect = window.location.search.split("?redirect=")[1];
        const path = redirect ? redirect : "/home";
        let username = e.target.value;
        dispatch(setAuthedUser(username));
        navigate(path);
    };

    return (
        <div>
            <h2 className="login-page">Login Page</h2>
            <select
                className="select-user"
                onChange={handleOnChangeUser}
                value={authedUser}
            >
                <option value="selected" hidden>
                    Select a user
                </option>
                {userValues.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const mapStateToProps = ({ users, authedUser }) => ({
    userValues: Object.values(users),
    authedUser: authedUser,
});

export default connect(mapStateToProps)(LoginPage);
