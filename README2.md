## Configuration on the linter

The specified Eslint only lint js files, don't work with JSX and other files. [prettier-eslint](https://github.com/prettier/prettier-eslint) is the additional linter i used.

## Major JS library
* [react-redux](https://react-redux.js.org/)
* [react-router](https://reactrouter.com/)

# Note
* The database file is gitignored, so it won't show in vscode.
* The url in frontend is still hardcoded, create-react-app have rule to forbidden you import file outside of src, the config.json is outside of src, so this need to modified later, now just use the hardcoded version for development.
* The original css libaray i want to use is SASS, but i found out the CSS library material ui already have similar stuff. JSS, css in javascript, fuck...
* Alert in material ui is called snackbars, their alert can not be close which sucks so bad
* fetch follow idiom listed in [fetch guide](https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91)