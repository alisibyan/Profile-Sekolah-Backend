const admin = require("firebase-admin");
const secret = require("./secret.json");

admin.initializeApp({
  credential: admin.credential.cert(secret),
  storageBucket: "gs://profile-sekolah-4058f.appspot.com",
});

exports.storage = admin.storage().bucket();
exports.database = admin.firestore();
