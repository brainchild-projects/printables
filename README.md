# Printables

![test and build](https://github.com/brainchild-projects/printables/actions/workflows/test.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/9ec071fc06eaafecde38/maintainability)](https://codeclimate.com/github/brainchild-projects/printables/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/brainchild-projects/printables/badge.svg?branch=main)](https://coveralls.io/github/brainchild-projects/printables?branch=main)

[https://brainchildprints.herokuapp.com/](https://brainchildprints.herokuapp.com/)

Printable resources mainly for education.

## Development

To start the development server, run:

```sh
npm start
```

### Tests

To run unit tests, run:

```sh
npm test
```

To run end-to-end tests, run:

```sh
npm run cypress
```

...and then run your tests from there.

You can also run them all from the command line with the following:

```sh
npx cypress run
```

### Generating Pages

This project comes with a script to help you build printable materials faster.
Run the following script and follow the prompts.

```sh
npm run generate-page
```
