# Game Time Starter Kit

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm build
```


To run tests in Node:

```js
npm test
```

## High Score Leaderboard

This project now includes simple Firebase hooks to store scores. Provide your
Firebase project credentials in `firebase-leaderboard.js` or supply them at
runtime using a `FIREBASE_CONFIG` variable:

```
var defaultConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};
var firebaseConfig = window.FIREBASE_CONFIG || defaultConfig;
```

The free tier of Firebase is sufficient for small projects. When the game ends,
your score is written to Firestore and the top five scores are displayed inside
the `#high-scores` div.
