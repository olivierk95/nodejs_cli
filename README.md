
This a school project aimed at creating and implementing a cli that tells you if your email has been breached or not and which are the website concerned by those breaches.

## Install and Usage

```console
$ npm install terminal-mailbreachchecker
```

Simple usage in terminal:

```console
$ pwned test@test.com
```

## Dependencies

In order to add a bit of fun, other node packages have been added so that the experience of wandering if one email has possible breaches or not is funnier.

* [**axios**](https://github.com/axios/axios) : make the HTTP request to the API of the website [Have I Been Pwned](https://haveibeenpwned.com/) and return a JSON object with the breaches.
* [**email-validator**](https://github.com/manishsaraan/email-validator) : check if it is a valid email entry or if it does not respect basic 
* [**chalk**](https://github.com/chalk/chalk/releases/tag/v2.0.0) : make the response returned in color to illustrate if it is whether an error, a breach or a no-breach.
* [**ora**](https://travis-ci.org/sindresorhus/ora) : enables to make a small animation while loading the results and processing the request to the API.
* [**figlet**](https://travis-ci.org/patorjk/figlet.js) : render a stylised text when the response come in the terminal.


## Release History
* 2019.01.22 v1.1.0 packages figlet, chalk and ora added.
* 2019.01.21 v1.0.0 basic application without any packages except email-validator.