import { Link } from "react-router-dom";
import React from "react";

import { connect, useDispatch } from "react-redux";
import "../../src/index.css";
import { setAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, users }) => {
    const dispatch = useDispatch();

    const user = users.find((u) => u.id === authedUser);

    function handleLogout() {
        dispatch(setAuthedUser(null));
        window.location.href = "/";
    }

    return (
        <nav className="navbar">
            <ul>
                {authedUser && (
                    <>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/add">New Poll</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">Leaderboard</Link>
                        </li>
                    </>
                )}
                <li>
                    {authedUser ? (
                        <Link onClick={handleLogout}>Logout</Link>
                    ) : (
                        <Link to="/">Login</Link>
                    )}
                </li>
            </ul>
            {user && (
                <div className="user">
                    <img src={user.avatarURL} alt={`Avatar of user`} />
                    <h3>{user.id}</h3>
                </div>
            )}
        </nav>
    );
};
const mapStateToProps = ({ authedUser, users }) => ({
    users: Object.values(users),
    authedUser,
});

export default connect(mapStateToProps)(Nav);
