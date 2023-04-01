import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../src/index.css";
import { useEffect } from "react";

const UserLoggedIn = ({ authedUser }) => {
    const navigate = useNavigate();

    const path = window.location.pathname;

    useEffect(() => {
        if (!authedUser && window.location.pathname !== "/")
            navigate(`/?redirect=${path}`);
    }, []);
    return (
        <>
            {authedUser && (
                <div>
                    <h1 className="user-logged-in">Polls for: {authedUser}</h1>
                </div>
            )}
        </>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    authedUser: authedUser,
});

export default connect(mapStateToProps)(UserLoggedIn);
