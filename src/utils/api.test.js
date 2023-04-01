import {
    _getUsers,
    _getQuestions,
    _saveQuestionAnswer,
    _saveQuestion,
} from "./api";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { BrowserRouter as Router } from "react-router-dom";
import Nav from "../components/Nav";

console.log(reducer);
const store = createStore(reducer, middleware);

describe("getusers", () => {
    it("get the users", async () => {
        var l = 4;
        var result = await _getUsers();

        expect(Object.keys(result).length).toEqual(l);
    });
});

describe("_getQuestions", () => {
    it("get the questions", async () => {
        var l = 6;
        var result = await _getQuestions();

        expect(Object.keys(result).length).toEqual(l);
    });
});

describe("_saveQuestion", () => {
    it("Saved question success", async () => {
        const question = {
            optionOneText: "one",
            optionTwoText: "two",
            author: "sarahedo",
        };

        var result = (await _saveQuestion(question)).formattedQuestion;
        expect(result.author).toEqual("sarahedo");
        expect(result.optionOne.text).toEqual("one");
        expect(result.optionTwo.text).toEqual("two");
    });

    it("failed to save question", async () => {
        const emptyObject = {};
        await expect(_saveQuestion(emptyObject)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        );
    });

    it("failed to save question on no user logged in", async () => {
        const question = {
            optionOneText: "one",
            optionTwoText: "two",
            author: null,
        };

        await expect(_saveQuestion(question)).rejects.toEqual(
            "Please provide optionOneText, optionTwoText, and author"
        );
    });

    it("failed to save question when user doesn't exist", async () => {
        const question = {
            optionOneText: "one",
            optionTwoText: "two",
            author: "johndoe",
        };

        await expect(_saveQuestion(question)).rejects.toEqual(
            "User doesn't exist"
        );
    });
});

describe("_saveQuestionAnswer", () => {
    it("successful save question answer", async () => {
        const testObj = {
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne",
        };
        var { result } = await _saveQuestionAnswer(testObj);
        expect(result).toEqual(true);
    });

    it("failed to save empty question answer", async () => {
        const emptyObject = {};
        await expect(_saveQuestionAnswer(emptyObject)).rejects.toEqual(
            "Please provide authedUser, qid, and answer"
        );
    });

    it("failed to save on unauthed user", async () => {
        const testObj = {
            authedUser: null,
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne",
        };
        await expect(_saveQuestionAnswer(testObj)).rejects.toEqual(
            "Please provide authedUser, qid, and answer"
        );
    });

    it("failed to save answer for a user which is not defined", async () => {
        const testObj = {
            authedUser: "Jane Doe",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne",
        };
        await expect(_saveQuestionAnswer(testObj)).rejects.toEqual(
            "user does not exist"
        );
    });
});

describe("render navbar correctly", () => {
    it("Matches DOM Snapshot", () => {
        const tree = renderer.create(
            <Provider store={store}>
                <Router>
                    <Nav />
                </Router>
            </Provider>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it("redirects user to login", async () => {
        const tree = render(
            <Provider store={store}>
                <Router>
                    <Nav />
                </Router>
            </Provider>
        );
        const select = await tree.findByText("Login");
        fireEvent.click(select);
        expect(window.location.pathname).toEqual("/");
    });
});
