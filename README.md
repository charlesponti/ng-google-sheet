[ ![Codeship Status for theponti/ng-google-sheet](https://codeship.com/projects/db097c90-7576-0132-e514-22ab3bab314c/status?branch=master)](https://codeship.com/projects/55147)

# ng-google-sheet

A Google Sheets API datagrid build with AngularJS

## Dependencies
* NodeJS & NPM

## Usage

1. Include ngGoogleSheets in requires
  ```js
  angular.module('app', [ 'ngGoogleSheets' ]);
  ```
2. Set up config in parent container
```js
function ParentController() {
  this.config = {
    // Google Spreadsheet key (can be found in url bar when viewing sheet)
    sheet: '1jEAO4g_C0NfGkMrLiqIIcXxbOmbfY5mvZ7GzevSi_5c',
    // Columns to display
    columns: [
      {
        // This is the field name of the column
        field: 'ticker',
        // This will appear in the header of the grid
        header: 'Ticker'
      },
      {
        field: 'industry',
        header: 'Industry'
      },
      {
        field: 'marketcap',
        header: 'Market Cap',
        // This is the type of value to display
        type: 'money'
      },
      {
        field: 'change',
        header: 'Change',
        type: 'percentage'
      },
      {
        field: 'price',
        header: 'Price',
        type: 'money'
      },
      {
        field: 'volume',
        header: 'Volume',
        type: 'number'
      }
    ]
  };
}
```

3. Add element to template
  ```html
  <ng-google-sheets config="ctrl.config"></ng-google-sheets>
  ```

## Running locally
1. Clone repo
2. Run `npm run bootstrap`
3. Run `npm start` for production mode or `npm run dev` for development mode.

## Features

### CSS
The CSS for the application is written using the Sass preprocessor and is stored in the `src/styles` directory. The build file, `build/styles/main.css`, is constructed with source maps while in development and is concatinated while in production mode.

#### Included Libraries:
* SASS
* Bootstrap

### JavaScript
All JavaScript files within the `src/scripts` directory are run through JSHint and then bundled together using Browserify. The `ng-annotate` transform is used with Browserify in order to properly construct the Angular application with the correct injections. While in development mode, the build step also includes creating the source maps. While in production mode, no source maps are created and the `bundle.js` file in uglified and minified.

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

### Tasks
Gulp is used to executed the tasks used in developing, testing, and building the application.

### Deployment
When the master branch is updated on GitHub, the application is run through Codeship which builds the app, runs the tests, and then deploys to Divshot.
