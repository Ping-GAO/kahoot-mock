## Configuration on the linter

The specified Eslint only lint js files, don't work with JSX and other files. [prettier-eslint](https://github.com/prettier/prettier-eslint) is the additional linter i used.

## Major JS library
* [react-redux](https://react-redux.js.org/)
* [react-router](https://reactrouter.com/)

# Note
* The database file is gitignored, so it won't show in vscode.
* The url in frontend is still hardcoded, create-react-app have rule to forbidden you import file outside of src, the config.json is outside of src, so this need to modified later, now just use the hardcoded version for development.
