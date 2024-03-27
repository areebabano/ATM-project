#!/usr/bin/env node
import inquirer from "inquirer";

let balance: number = 100000; //$
let myPin: number = 2771;

let pinAns = await inquirer.prompt([
    {
        name: "pinCode",
        type: "number",
        message: "Enter your pin code"
    },
    
]);

if(pinAns.pinCode === myPin){
    console.log("Correct pin code");
} else{
    console.log("Incorrect pin code");
}

let answer = await inquirer.prompt([
    {
        name: "accountType",
        type: "list",
        choices: ["current","saving"],
        message: "Please select your account"
    },
    {
        name: "transactionType",
        type: "list",
        choices: ["fast cash","withdrawl"],
        message: "Please select your transaction type",
        when(answer) {
            return answer.accountType === "current";
        },
    },
    {
        name: "amount",
        type: "list",
        choices: [1000,2000,5000,10000,20000,50000],
        message: "Please select your amount",
        when(answer) {
            return answer.transactionType === "fast cash";
        },
    },
    {
        name: "amount",
        type: "number",
        message: "Enter your amount",
        when(answer) {
            return answer.transactionType === "withdrawl";
        },
    }
]);

console.log(`Your current balance is: ${balance}`);

const enteredAmount = answer.amount;

if (balance < enteredAmount) {
    console.log("Insuficiant balance")
    
} else if(answer.accountType != "saving"){
    const remaining = balance -= enteredAmount;
    console.log(`Your remaining balance is: ${balance}`);
    
}




