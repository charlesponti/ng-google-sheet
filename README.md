[ ![Codeship Status for theponti/angular-datagrid](https://codeship.com/projects/cce16f70-72fa-0132-d565-5ad4053fa8e4/status?branch=master)](https://codeship.com/projects/54872)

# Angular-Datagrid

A Google Sheets API datagrid build with AngularJS


## Usage

```js
  angular.module('app', [
    'google-sheets-grid'
  ]);
```

```html
  <ng-google-sheet key="GOOGLE_SPREADSHEET_KEY"></ng-google-sheet>
```

## Dependencies
* NodeJS
* NPM
* Bower

## Features

### Build
* Gulp
  This boilerplate uses the version of `Gulp` in the `node_modules` directory so you will not need to have it installed globally.
* Browserify

### Styles
* **SASS**
* **Prefix-Free**
* **Bootstrap**

### Scripts
* JSHint
* jQuery
* Angular (v1.3.8)
  * Angular-Route

### Testing
* Karma
  This boilerplate uses the version of `Karma` in the `node_modules` directory so you will not need to have it installed globally.
* Jasmine

### Other
* Modernizer
* HTML Minification

## Usage
1. Clone repo
2. Run `npm install && bower install`
3. Run `rm -rf .git && git init`
4. Run `npm run start`
5. Start Coding
