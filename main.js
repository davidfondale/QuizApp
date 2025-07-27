/*Set up variables to track the user's score and the current question*/

let qNum = 0;

/*Set up references to all of the HTML objects on our form*/

const C1 = document.querySelector("#btn-C1");
const C2 = document.querySelector("#btn-C2");
const C3 = document.querySelector("#btn-C3");
const C4 = document.querySelector("#btn-C4");
const NEXT = document.querySelector("#next");
const RESULTS = document.querySelector("#results");
const QUESTION = document.querySelector("#question");
const RESET = document.querySelector("#reset");
const CONTAINER = document.querySelector("#container");

/*Hold the choice buttons in an array to iterate through them later*/

const COBJS = [C1, C2, C3, C4];

/*Define object literals to hold the questions and put them into an array*/
const Q1 = {Question: "Which JavaScript loop executes at least once whether its condition is true or not?",
            Choice1: "do...while loop",
            Choice2: "for loop",
            Choice3: "while loop",
            Choice4: "None of the above",  
            Answer: "do...while loop" 
};

const Q2 = {Question: "Which of the following is the correct way to declare a JavaScript variable?",
            Choice1: "variable x = 3",
            Choice2: "let x = 3",
            Choice3: "x = 3",
            Choice4: "JavaScript doesn't use variables",
            Answer: "let x = 3"
};

const Q3 = {Question: "Which of the following is the correct way to declare a JavaScript variable without assigning its value?",
            Choice1: "variable x = null",
            Choice2: "JavaScript doesn't allow variable declarations without assinging values",
            Choice3: "let x",
            Choice4: "x = nothing",
            Answer: "let x"
};

const Q4 = {Question: "Which of the following is the correct way to declare a JavaScript constant if its value will change later?",
            Choice1: "const x = 3",
            Choice2: "const $x = 3",
            Choice3: "const x",
            Choice4: "JavaScript doesn't allow the values of constants to change",
            Answer: "JavaScript doesn't allow the values of constants to change"
};

const Q5 = {Question: "Which programming language besides JavaScript is interpreted by browsers?",
            Choice1: "C#",
            Choice2: "C++",
            Choice3: "Rust",
            Choice4: "JavaScript is the only language interpreted directly in the browser",
            Answer: "JavaScript is the only language interpreted directly in the browser"
};

const QOBJS = [Q1, Q2, Q3, Q4, Q5];

/*set the score variable relative to the question bank*/

let score = QOBJS.length;

/*populate the form with the current (first) question*/

populateForm();


/*Define a function to evaluate the user's response*/
function respEval(e) {
    /*Grab the id of the choice button on which the user clicked*/
    const CID = e.target.id;
    /*Iterate through the choices and mark them appropriately*/
    for(let i = 0; i < COBJS.length; i++) {
        /* If the user chose an incorrect response, mark it incorrect */
        if(COBJS[i].textContent !== QOBJS[qNum].Answer && COBJS[i].id === CID) {
            COBJS[i].classList.replace("question-button", "incorrect-question-button");
            COBJS[i].disabled = true;
            /*ding his score total*/
            score--;
        }
        /* mark the correct answer regardless */
        else if(COBJS[i].textContent === QOBJS[qNum].Answer) {
            COBJS[i].classList.replace("question-button", "correct-question-button");
            COBJS[i].disabled = true;
        }
        /* otherwise, just disable the button */
        else {
            COBJS[i].disabled = true;
        }
    }
    /*Also, enable the next action button, whatever it is*/
    if(qNum === QOBJS.length - 1) {
        RESULTS.disabled = false;
    }
    else {
        NEXT.disabled = false;
    }  
/*When we're all done evaluating the response, update the current question variable*/
qNum++;
}
/*Define a function to restore the form's default state*/
function restoreState() {
    for(let i = 0; i < COBJS.length; i++) {
        COBJS[i].className = "";
        COBJS[i].textContent = "";
        COBJS[i].disabled = false;
        COBJS[i].className = "question-button";
    }
    NEXT.disabled = true;
    QUESTION.textContent = "";
}
/* Define a function to populate the quiz form */
function populateForm() {
    /*Check to see if we still have questions*/
    if(qNum < QOBJS.length - 1) {
        /*If so, reset the form's state and populate it*/
        restoreState();
        QUESTION.textContent = QOBJS[qNum].Question;
        C1.textContent = QOBJS[qNum].Choice1;
        C2.textContent = QOBJS[qNum].Choice2;
        C3.textContent = QOBJS[qNum].Choice3;
        C4.textContent = QOBJS[qNum].Choice4;
    }
    /*If we're on the last question, let the user get his results*/
    else {
            restoreState();
            QUESTION.textContent = QOBJS[qNum].Question;
            C1.textContent = QOBJS[qNum].Choice1;
            C2.textContent = QOBJS[qNum].Choice2;
            C3.textContent = QOBJS[qNum].Choice3;
            C4.textContent = QOBJS[qNum].Choice4;
            NEXT.classList.add("hidden");
            RESULTS.classList.remove("hidden");
            RESULTS.disabled = true;
    }
};
/*Define a function to let the user see his results*/
function getScore() {
        /*We don't need any of the choice buttons*/
        C1.classList.add("hidden");
        C2.classList.add("hidden");
        C3.classList.add("hidden");
        C4.classList.add("hidden");
        /*We don't need the reults button anymore, either*/
        RESULTS.classList.add("hidden");
        /*display the user's quiz results*/
        let resultMsg = `You scored ${score} out of ${QOBJS.length}`;
        QUESTION.textContent = resultMsg;
        /*display the reset button to reset the form back to its default state*/
        RESET.classList.remove("hidden");
};
/*Define a function to reset the form*/
function reset() {
    /*restore the form to its default state*/
    qNum = 0;
    score = QOBJS.length;
    C1.classList.remove("hidden");
    C2.classList.remove("hidden");
    C3.classList.remove("hidden");
    C4.classList.remove("hidden");
    NEXT.classList.remove("hidden");
    RESULTS.classList.add("hidden");
    RESET.classList.add("hidden");
    /*populate the for with the current (first) question*/
    populateForm();
};
/*assign event listeners to the form objects*/
CONTAINER.addEventListener("click", respEval);
NEXT.addEventListener("click", populateForm);
RESULTS.addEventListener("click", getScore);
RESET.addEventListener("click", reset);
