# Printables

![test and build](https://github.com/brainchild-projects/printables/actions/workflows/test.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/9ec071fc06eaafecde38/maintainability)](https://codeclimate.com/github/brainchild-projects/printables/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/brainchild-projects/printables/badge.svg?branch=main)](https://coveralls.io/github/brainchild-projects/printables?branch=main)

[https://printables.pages.dev](https://printables.pages.dev)

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

#### Troubleshooting Tests

If you get the following error when running tests:

```
libuuid.so.1: cannot open shared object file: No such file or directory
```

On Ubuntu, install the following canvas dependencies:

```sh
sudo apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Then copy the libraries:

```sh
cp /lib/x86_64-linux-gnu/{libblkid,libmount,libuuid}.so.1 ./node_modules/canvas/build/Release
```

Then rebuild:

```sh
npm rebuild
```

### Generating Pages

This project comes with a script to help you build printable materials faster.
Run the following script and follow the prompts.

```sh
npm run generate-page
```
