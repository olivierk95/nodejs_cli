#!/usr/bin/env node

const validator = require("email-validator");
const axios = require("axios");

//check if email is valid
var account = process.argv[2];
var validEmail = validator.validate(account);

if(validEmail) {
    axios({
        method:'get',
        url:`https://haveibeenpwned.com/api/v2/breachedaccount/${account}`,
        headers: {"User-Agent": "nodejs-cli-mailbreach"},
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch (function (error) {
        const status = error.response&&error.response.status;
        
        switch(status) {
            
            case 400:
                console.log("Speak nicely and check your input twice ; bad request");   
                break;
            
            case 403:
                console.log("You forget to match the user agent, what were you thinking about you perv?");  
                break;
            
            case 404:
                console.log("No breach, you are good brother!");
            
            case 429:
                console.log("Come later my friend, the website is under attack ; too many requests.");
                break;

            default:
                console.log("Unknow error, wtf have done buddy? Check your connection");

        }
    });
} else if(!validEmail) {
    console.log("Invalid mail address, try again mate!")
};
