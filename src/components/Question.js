import { connect } from "react-redux";
import { userVoted } from "../utils/helper";
import { handleSaveQuestionAnswer } from "../actions/shared";
import "../../src/index.css";

const Question = (props) => {
    const { dispatch, question, usersValues, authedUser } = props;
    let questionAuthor = question.author;

    let user = usersValues.find((u) => {
        return u.id === questionAuthor;
    });

    let canVote = !userVoted(question, authedUser);

    let votedFor;
    if (!canVote) {
        votedFor = question.optionOne.votes.find((u) => u === authedUser)
            ? "Option One"
            : question.optionTwo.votes.find((u) => u === authedUser)
            ? "Option Two"
            : "";
    }

    const handleOnClick = (e) => {
        console.log("sending dispatch");
        e.preventDefault();
        dispatch(
            handleSaveQuestionAnswer({
                authedUser,
                qid: question.id,
                answer: e.target.value,
            })
        );
    };

    const calcPercentage = (question) => {
        const totalVotes =
            question.optionOne.votes.length + question.optionTwo.votes.length;
        return [
            (question.optionOne.votes.length / totalVotes) * 100 + " %",
            (question.optionTwo.votes.length / totalVotes) * 100 + " %",
        ];
    };

    return (
        <div className="question-details">
            <div>
                <p className="poll-by">{"Poll by: @" + questionAuthor}</p>
                <br></br>
                <img
                    src={user.avatarURL}
                    alt={`Avatar of ${questionAuthor}`}
                    className="avater-displayed"
                />
            </div>
            <br></br>
            <div className="question-displayed">
                <div>
                    <div className="question">Would you rather?</div>
                    <div>
                        <div>
                            <p className="options-for-questions">
                                {question.optionOne.text}
                            </p>
                            <ul className="voted-by">
                                {" "}
                                Voted By: ({calcPercentage(question)[0]})
                                {question.optionOne.votes.map((v) => {
                                    return <li key={v}>@{v}</li>;
                                })}
                            </ul>
                            <span>OR</span>
                            <p className="options-for-questions">
                                {question.optionTwo.text}
                            </p>
                            <ul className="voted-by">
                                {" "}
                                Voted By: ({calcPercentage(question)[1]})
                                {question.optionTwo.votes.map((v) => {
                                    return <li key={v}>@{v}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        {canVote ? (
                            <div>
                                <button
                                    className="options"
                                    onClick={handleOnClick}
                                    value="optionOne"
                                >
                                    Option 1
                                </button>
                                <button
                                    className="options"
                                    onClick={handleOnClick}
                                    value="optionTwo"
                                >
                                    Option 2
                                </button>
                            </div>
                        ) : (
                            <div>Already voted for {votedFor}!</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ users, authedUser }) => {
    return {
        usersValues: Object.values(users),
        authedUser,
    };
};

export default connect(mapStateToProps)(Question);
