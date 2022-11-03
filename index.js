const admin = require("firebase-admin");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE || "",
  project_id: process.env.FIREBASE_PROJECT_ID || "",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n") || "",
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
  client_id: process.env.FIREBASE_CLIENT_ID || "",
  auth_uri: process.env.FIREBASE_AUTH_URI || "",
  token_uri: process.env.FIREBASE_TOKEN_URI || "",
  auth_provider_x509_ce: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || "",
};

const isDev = process.env.NODE_ENV !== "production";

const validateFirebaseIdToken = async (req, res, next) => {
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
};
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

app.use(cors({ origin: true }));
app.use(express.json());
app.use(!isDev ? validateFirebaseIdToken : (req, res, next) => next());
// app.use(validateFirebaseIdToken);

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World2!");
});

app.use(require("./routes/users.routes"));

app.listen(3000, () => console.log("Server is running on port 3000"));
