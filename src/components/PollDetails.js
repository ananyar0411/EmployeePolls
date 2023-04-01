import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Question from "./Question";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

const PollDetails = ({ id, questionValues }) => {
    let question = questionValues.filter((q) => q.id === id)[0];

    return (
        <div>
            {question ? (
                <>
                    <h4>Question Details</h4>
                    <Question question={question}></Question>
                </>
            ) : (
                <h1>404! Question not found!</h1>
            )}
        </div>
    );
};

const mapStateToProps = ({ questions }, props) => {
    const id = props.router.params.questionId;

    return {
        questionValues: Object.values(questions),
        id,
    };
};

export default withRouter(connect(mapStateToProps)(PollDetails));
