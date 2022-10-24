const dotenv = require("dotenv");

dotenv.config();

const {
  PORT,
  API_KEY,
  AUTHDOMAIN,
  PROJECT_ID,
  STORAGEBUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

module.exports = {
  port: PORT,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  },
};
