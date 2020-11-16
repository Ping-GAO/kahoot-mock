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


// get the base url of app is running on include the port number
const urlFull = window.location.href;
const urlSplit = urlFull.split("/");
export const urlBase = `${urlSplit[0]  }//${  urlSplit[2]}`

export default API_URL;
