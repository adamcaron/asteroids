// Firebase setup for high-score leaderboard
// Load Firebase scripts before this file.

// Replace with your Firebase project configuration or set FIREBASE_CONFIG
var defaultConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};
var firebaseConfig = window.FIREBASE_CONFIG || defaultConfig;

if (!window.firebase.apps.length) {
  window.firebase.initializeApp(firebaseConfig);
}
var db = window.firebase.firestore();

window.saveScore = function(score, level) {
  return db.collection('scores').add({
    score: score,
    level: level,
    created: window.firebase.firestore.FieldValue.serverTimestamp()
  });
};

window.loadScores = function() {
  return db.collection('scores')
    .orderBy('score', 'desc')
    .limit(5)
    .get()
    .then(function(query) {
      var list = '';
      query.forEach(function(doc) {
        var data = doc.data();
        list += '<div>' + data.score + '</div>';
      });
      document.getElementById('high-scores').innerHTML = list;
    });
};
