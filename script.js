"use strict"
// Start writing code from here
// Declare all the global variables

const operand1 = document.querySelector("#operand1");
const operand2 = document.querySelector("#operand2");
const operator = document.querySelector("#operator");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const msgbox = document.querySelector("#msgbox");
const correctBeep = document.querySelector("#correctBeep");
const wrongBeep = document.querySelector("#wrongBeep");
let options = [option1,option2,option3,option4];

let indexOfAns;
let setQuestion;
let setAnswer;

const generateNumber = (lower, upper) => {
    // Generates a random number which is present in between lower bound and upper bound
    const randomNumber = Math.ceil(Math.random() * (upper - lower)) + lower;
    return randomNumber;
}
const generateOperator = () => {
    // Generates a random operator which is present in arrayOfOperator
    const arrayOfOperator = ['+', '-', '*', '/'];
    const operator = arrayOfOperator[generateNumber(0, arrayOfOperator.length) - 1];
    return operator;
}
const generateQuestion = () => {
    operand1.innerHTML = generateNumber(-50, 50);
    operand2.innerHTML = generateNumber(-50, 50);
    operator.innerHTML = generateOperator();
    for(let i=0;i<options.length;i++){
        options[i].setAttribute("style","background-color:rgb(77, 62, 71);")
    }
    msgbox.innerHTML = "Result";
}
const generateAnswer = () => {
    generateQuestion();
    let a = parseInt(operand1.innerHTML);
    let b = parseInt(operand2.innerHTML);
    let op = operator.innerHTML;
    let ans;
    switch (op) {
        case '+':
            ans = a + b;
            break;
        case '-':
            ans = a - b;
            break;
        case '*':
            ans = a * b;
            break;
        case '/':
            ans = (a / b);
            break;
    }
    indexOfAns = generateNumber(0,options.length)-1;
    options[indexOfAns].innerHTML = ans;
    for(let i=0;i<options.length;i++){
        if(i!=indexOfAns){
            if(op == '/'){
                options[i].innerHTML = generateNumber(ans,ans+50).toFixed(2);
            }
            else{
                options[i].innerHTML = generateNumber(ans,ans+50);
            }
        }
        else{
            if(op == '/'){
                options[i].innerHTML = ans.toFixed(2);
            }
            else{
                options[i].innerHTML = ans;
            }
        }
    }
    clearInterval(setAnswer);
}
for(let i=0;i<options.length;i++){
    options[i].addEventListener("click",function(){
        for(let j=0;j<options.length;j++){
            if(j!=indexOfAns){
                options[j].setAttribute("style","background-color:red;");
            }
            else{
                options[j].setAttribute("style","background-color:green;");
            }
            if(i==indexOfAns){
                msgbox.innerHTML = "Correct Answer";
                correctBeep.play();
            }
            else{
                msgbox.innerHTML = "Wrong Answer";
                wrongBeep.play();
            }
        }
        options[i].setAttribute("disabled","true");
        setAnswer = setInterval(generateAnswer,5000);
    });
}

generateQuestion();
generateAnswer();