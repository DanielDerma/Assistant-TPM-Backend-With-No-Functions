const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");

const app = express();

const serviceAccount = require("./service.json");

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
    return;
  }
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors({ origin: true }));
app.use(!isDev ? validateFirebaseIdToken : (req, res, next) => next());

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.use(require("./routes/users.routes"));

app.listen(3000, () => console.log("Server is running on port 3000"));
