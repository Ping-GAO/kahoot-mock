import data from "./config.json";

const API_URL = `http://localhost:${data.BACKEND_PORT}`;


export const newAnswer = (answerBody, isRightOne) => ({
    answerBody,
    isRightOne,
});

// the definition of how to create a question
// answers is a list of object created by newAnswer method
export const newQuestion = (
    questionId,
    questionBody,
    answers,
    type,
    timeLimit,
    worthOfPoints,
    image
) => ({
    questionId,
    questionBody,
    answers,
    type,
    timeLimit,
    worthOfPoints,
    image,
});

export default API_URL;
