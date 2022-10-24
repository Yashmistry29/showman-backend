const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const { getAuth } = require('firebase/auth')
const config = require('../config');

console.log('Connecting to Firebase...');
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
console.log('Connected to FireStore');
const auth = getAuth(app);
console.log('Connected to Firebase Auth');
console.log('Connected to Firebase');

module.exports = { db, auth };