"use strict";

const app = document.getElementById("quiz-app");
const quizCard = document.getElementById("quiz-details");
const questionsCard = document.getElementById("questions-card");
const resultCard = document.getElementById("result-card");

let quiz;

function initApp() {
    const questions = [
        {
            title: "Q1",
            options: ["A1", "A2", "A3", "A4"],
            correctAnswer: 0,
        }, {
            title: "Q2",
            options: ["A1", "A2", "A3", "A4"],
            correctAnswer: 1,
        },{
            title: "Q3",
            options: ["A1", "A2", "A3", "A4"],
            correctAnswer: 2,
        },{
            title: "Q4",
            options: ["A1", "A2", "A3", "A4"],
            correctAnswer:3,
        },
    ];

    quiz = new Quiz(
        "Simple  Quiz",
        'Sample Text',
        40,
        questions);

    // questions.map(q => quiz.addQuestion(q.title, q.options));

    new QuizElementsHelper(app, quizCard, questionsCard, resultCard, quiz);
}

initApp();


