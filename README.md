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

This project now includes simple Firebase hooks to store scores. The
configuration is hard-coded in `firebase-leaderboard.js` for a public demo
project:

```
var firebaseConfig = {
  apiKey: "AIzaSyAnW89Ydx9-6PA6zgOiyi5LC3fGDM75Lug",
  authDomain: "asteroids-high-scores-f6c47.firebaseapp.com",
  projectId: "asteroids-high-scores-f6c47",
  storageBucket: "asteroids-high-scores-f6c47.firebasestorage.app",
  messagingSenderId: "52296295518",
  appId: "1:52296295518:web:c98a3998c6b37fcae680cf"
};
```

Feel free to edit these values with your own Firebase project credentials if
you wish to use a different backend.

The free tier of Firebase is sufficient for small projects. When the game ends,
your score is written to Firestore and the top five scores are displayed inside
the `#high-scores` div.
