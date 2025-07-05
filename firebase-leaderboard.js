// Firebase setup for high-score leaderboard
// Load Firebase scripts before this file.

// Hard-coded Firebase configuration for the public demo project
var firebaseConfig = {
  apiKey: "AIzaSyAnW89Ydx9-6PA6zgOiyi5LC3fGDM75Lug",
  authDomain: "asteroids-high-scores-f6c47.firebaseapp.com",
  projectId: "asteroids-high-scores-f6c47",
  storageBucket: "asteroids-high-scores-f6c47.firebasestorage.app",
  messagingSenderId: "52296295518",
  appId: "1:52296295518:web:c98a3998c6b37fcae680cf"
};

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
