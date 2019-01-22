#!/usr/bin/env node

const validator = require("email-validator");
const axios = require("axios");
const chalk = require('chalk');
const ora = require('ora');

//check if email is valid
var account = process.argv[2];
var validEmail = validator.validate(account);

//spinner for loading
const spinner = ora('');
spinner.start();
setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading breaches';
});

if (validEmail) {

    axios({

            method: 'get',
            url: `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`,
            headers: {
                "User-Agent": "terminal-mailbreachchecker"
            },

        })

        .then(function (response) {

            spinner.text = 'ATTENTION, breaches found';
            spinner.warn();

            var breachArray = response.data.map(data => data.Name);
            console.log(chalk.white.bgRed(breachArray.toString()));

        })

        .catch(function (error) {

            const status = error.response && error.response.status;

            switch (status) {

                case 400:
                    spinner.text = 'error';
                    spinner.fail();
                    
                    console.log(chalk.red("Speak nicely and check your input twice ; bad request"));
                    break;

                case 403:
                    spinner.text = 'error';
                    spinner.fail();
                    
                    console.log(chalk.red("You forget to match the user agent, what were you thinking about you perv?"));
                    break;

                case 404:
                    spinner.text = 'SUCCESS';
                    spinner.succeed();
                    
                    console.log(chalk.white.bgGreen("No breach, you are good brother!"));
                    break;

                case 429:
                    spinner.text = 'error';
                    spinner.fail();
                    
                    console.log(chalk.red("Come later my friend, the website is under attack ; too many requests."));
                    break;

                default:
                    spinner.text = 'error';
                    spinner.fail();
                    
                    console.log(chalk.red("Unknow error, wtf have done buddy? Check your connection"));

            }

        });

} else if (!validEmail) {
    spinner.text = 'mistake';
    spinner.fail();
    
    console.log(chalk.white.bgRedBright("Invalid mail address, try again mate!"));

};