# Music API

## Overview

This application is a TypeScript REST API developed for the SWENG861 class project.  The application takes in artist names and song names and returns information form the Napster API about the artist and about the song.

## Architecure

- TypeScript application with Express server
- Napster API

## Development

The Node version is 12.x and the TypeScript code is transpiled to es2017 to take advantage of [zero-cost async stack traces](https://docs.google.com/document/d/13Sy_kBIJGP0XT34V1CV3nkWya4TwYx9L3Yv45LdGB6Q/edit).  This helps improve debugging by showing async function calls in the stacktrace, whereas before, async calls showed up as anonymous.

Below is a diagram of the main app components and how they interact with each other and the components external to the application:

![music-api modules](./docs/Music%20API%20Modules.png)

## Local Setup

This application requires [Node.js](https://nodejs.org/en/) version 12.x+ and [TypeScript](https://www.typescriptlang.org/) to run locally. Clone this repo and run the following:

`npm install`

### Linting

This project uses [prettier](https://prettier.io/) for formatting and [ESLint](https://eslint.org/) with [typescript plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) for linting.  The lint config is using the [AirBnB style guide](https://github.com/airbnb/javascript) as a base for configuration.

#### Prettier

To check formatting:

`npm run format:check`

To make formatting changes:

`npm run format`

#### ESLint

ESLint is being used as opposed to TSLint because ESLint has been shown to be more performant.  TypeScript also is moving away from supporting TSLint, and [is encouraging developers to use ESLint](https://github.com/Microsoft/TypeScript/issues/29288).

To run the linter:

`npm run lint`

## Running the app

The application is designed to run on port 3000 by default.

### To run the app

After installing the application, do either of the following:

`npm run start:dev` to run in development mode using nodemon and tsc-watch

or

`npm run start:local` to run in production mode

### Hitting the endpoints

Once the server is running, the app can be reached at <http://localhost:3000> through the following endpoints:

| Endpoint                               | Description
| -------------------------------------- | -----------------------------------------------------------------------
| **GET /healthcheck**                   | healthcheck endpoint; displays 'Health is good'
| **GET /artists/:artistName**           | returns information about an artist based on artist name passed in
| **GET /tracks/:songTitle**             | returns a list of tracks matching song title passed in
| **GET /tracks/:songTitle/:artistName** | returns a list of tracks matching song title and artist name passed in
| **GET /admin/logging/:logLevel**       | allows user to change the log level

Navigate to <http://localhost:3000/swagger> to test the endpoints.

You should see the following:

![example /swagger page](docs/Swagger%20UI%20example.png)

You can test each endpoint by clicking *GET*  *> Try it out* and then scrolling down and clicking *Execute*. Note: for **/tracks** and **/artists**,
a song title or artist name needs to be entered into the text field under *Parameters* before clicking *Execute*.

## Testing

This project uses jest for testing.  To learn more about the testing package, please visit <https://jestjs.io>.

To run tests:

`npm run test`

with coverage:

`npm run test:cov`

to see all individual tests:

`npm run test:verbose`

## To Do

- integration tests
