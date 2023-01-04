const { Router } = require("express");
// eslint-disable-next-line new-cap
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();
const auth = admin.auth();

router.post("/userAdmin", async (req, res) => {
  const { email, password } = req.body;
  const user = await auth.createUser({ email, password });
  await db.collection("user").doc(email).set({
    age: 23,
    company: false,
    contactAdd: 6391551212,
    email,
    password,
    fname: "Cesar",
    lname: "Derma",
  });
  res.json({ id: user.uid, email });
});

router.get("/test1", async (req, res) => {
  // create a utils under utilsDashboard and add the following code
  const doc2022 = {
    maintenance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    operation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    security: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  await db.collection("utilsDashboard").doc("UU5FyU_K").set(doc2022);
  res.json({ msg: "ok" });
});

router.get("/test2", async (req, res) => {
  const collectionName = "company";
  const query = db.collection(collectionName);

  const querySnapshot = await query.get();
  const docs = querySnapshot.docs;

  const response = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  response.forEach(async (element) => {
    await db.collection(collectionName).doc(element.id).delete();
  });

  res.json({ msg: "ok" });
});

router.get("/test3", async (req, res) => {
  // create a utils under utilsDashboard and add the following code
  const doc2022 = {
    maintenance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    operation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    security: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  await db.collection("utilsDashboard").doc("UU5FyU_K").set(doc2022);
  res.json({ msg: "ok" });
});

router.get("/tagbus_data", async (req, res) => {
  // create a utils under utilsDashboard and add the following code
  const TEC_ROUTE_COORDS = [
    { latitude: 28.190781, longitude: -105.479245 },
    {
      latitude: 28.190428258856585,
      longitude: -105.47885417856236,
    },
    {
      latitude: 28.191091996260198,
      longitude: -105.4780934074484,
    },
    {
      latitude: 28.19107488721158,
      longitude: -105.47731946147948,
    },
    {
      latitude: 28.191091994247337,
      longitude: -105.4770159683772,
    },
    {
      latitude: 28.19106174881272,
      longitude: -105.47660313401956,
    },
    {
      latitude: 28.191079429412966,
      longitude: -105.47445467815658,
    },
    {
      latitude: 28.190513534913546,
      longitude: -105.47380369301548,
    },
    {
      latitude: 28.191098254497295,
      longitude: -105.47312727028597,
    },
    {
      latitude: 28.191381347547168,
      longitude: -105.47344175929064,
    },
    {
      latitude: 28.19284300467208,
      longitude: -105.47179688234799,
    },
    {
      latitude: 28.192785109570334,
      longitude: -105.47165859146997,
    },
    {
      latitude: 28.19283487904566,
      longitude: -105.47144539303304,
    },
    {
      latitude: 28.19295981048365,
      longitude: -105.47136011365828,
    },
    {
      latitude: 28.193154825120622,
      longitude: -105.47141773485703,
    },
    {
      latitude: 28.194575263879987,
      longitude: -105.46987793717959,
    },
    {
      latitude: 28.194267206461156,
      longitude: -105.4694943075154,
    },
    {
      latitude: 28.194910870145257,
      longitude: -105.46876399028805,
    },
    {
      latitude: 28.195526980390152,
      longitude: -105.46948294069313,
    },
    {
      latitude: 28.19744822285609,
      longitude: -105.46948049379203,
    },
    {
      latitude: 28.198542179944702,
      longitude: -105.46830801948481,
    },
    {
      latitude: 28.19955071655157,
      longitude: -105.46714975807988,
    },
    {
      latitude: 28.201114585445925,
      longitude: -105.46537955528117,
    },
    {
      latitude: 28.202290518828235,
      longitude: -105.46236804711968,
    },
    {
      latitude: 28.204605064549526,
      longitude: -105.45753001497195,
    },
    {
      latitude: 28.207574309670182,
      longitude: -105.45041119617156,
    },
    {
      latitude: 28.207731907864485,
      longitude: -105.45006379407295,
    },
    {
      latitude: 28.20871990710366,
      longitude: -105.44899869947827,
    },
    {
      latitude: 28.209213903298263,
      longitude: -105.44848016657862,
    },
    {
      latitude: 28.209821479117743,
      longitude: -105.44691702921756,
    },
    {
      latitude: 28.215717016437527,
      longitude: -105.43280792617632,
    },
  ];

  // make TEC_ROUTE_COORDS a object with a key starting at 0

  await db.collection("routes").doc("tecDelicias").set({
    coords: TEC_ROUTE_COORDS,
  });
  // do the same as above but with random doc id
  res.json({ msg: "ok" });
});
router.get("/tagbus_stop", async (req, res) => {
  // create a utils under utilsDashboard and add the following code
  const TEC_ROUTE_COORDS = [
    {
      id: 1,
      coordinates: {
        latitude: 28.19078870059308,
        longitude: -105.4792259228223,
      },
      title: "Primer punto de Abordaje",
      pinColor: "green",
    },
    {
      id: 2,
      coordinates: {
        latitude: 28.19148377554644,
        longitude: -105.47337386752281,
      },
      title: "Segundo punto de Abordaje",
      pinColor: "green",
    },
    {
      id: 3,
      coordinates: {
        latitude: 28.1975577211,
        longitude: -105.46940033013375,
      },
      title: "Tercer punto de Abordaje",
      pinColor: "green",
    },
  ];

  // update the routes collection with the new data

  await db.collection("routes").doc("tecDelicias").update({
    stops: TEC_ROUTE_COORDS,
  });
  // do the same as above but with random doc id
  res.json({ msg: "ok" });
});

router.get("/tagbus_create_user", async (req, res) => {
  // create user with email and password in firebase auth and collection users in firestore
  const user = await auth.createUser({
    email: "daniel@tecnm.delicias.com",
    password: "password1234",
  });
  await db.collection("users").doc(user.uid).set({
    email: "daniel@tecnm.delicias.com",
    name: "Daniel Derma",
    role: "student",
    route: "tecDelicias",
  });
  res.json({ msg: "ok" });
});

router.get("/tagBus_sendMessages", async (req, res) => {
  // endpoint to send messages to all users in a route

  const route = "tecDelicias";
  const users = await db.collection("users").where("route", "==", route).get();

  const validIds = users.docs.map((user) => user.id);
  const validTokens = validIds.map(async (uid) => {
    const tokenDoc = await db.collection("tokens").doc(uid).get();
    return tokenDoc.data().token;
  });

  const allTokens = await Promise.all(validTokens);

  res.json({ allTokens });
});

module.exports = router;
