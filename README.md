[ ![Codeship Status for theponti/ng-google-sheet](https://codeship.com/projects/db097c90-7576-0132-e514-22ab3bab314c/status?branch=master)](https://codeship.com/projects/55147)

# Angular-Datagrid

A Google Sheets API datagrid build with AngularJS

## Dependencies
* NodeJS
* NPM
* Bower

## Features

### Build
* Gulp
* Browserify
* ng-annotate

### CSS

#### Included Libraries:
* SASS
* Bootstrap

### JavaScript
All JavaScript files within the `/src/scripts` directory are run through JSHint and then bundled together using Browserify. The `ng-annotate` transform is used with Browserify in order to properly construct the Angular application with the correct injections. While in development mode, the build step also includes creating the source maps. While in production mode, no source maps are created and the `bundle.js` file in uglified and minified.

#### Included Libraries:
* jquery
* lodash
* angular
* angular-route
* angular-resource
* accounting
* money

### HTML
All HTML is minified and stored in the `/build` directory. Any `.html` file within the `/src/views` directory will be compiled into `templates.js` for use in Angular's $templateCache. This way switch between routes and loading directives will not require any additional HTTP requests as the view will be loaded from the cache.

### Testing
* Karma
* Jasmine
* Protractor

### Deployment
When the master branch is updated on GitHub, the application is run through Codeship which builds the app, runs the tests, and then deploys to Divshot.

## Usage
1. Clone repo
2. Run `npm install && bower install`
3. Run `rm -rf .git && git init`
4. Run `npm run start`
5. Start Coding
