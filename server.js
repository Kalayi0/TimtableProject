const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { firebaseConfig } = require('./config/firebaseConfig');

const app = express();

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Define your API routes and other application logic here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
