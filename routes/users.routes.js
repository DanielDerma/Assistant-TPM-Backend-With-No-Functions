const { Router } = require("express");
// eslint-disable-next-line new-cap
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();
const auth = admin.auth();

router.get("/users", async (req, res) => {
  const query = db.collection("user");
  const querySnapshot = await query.get();
  const docs = querySnapshot.docs;

  const response = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json(response);
});

router.post("/user", async (req, res) => {
  const { email, password } = req.body;
  const user = await auth.createUser({ email, password });
  res.json({ id: user.uid, email });
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await auth.deleteUser(id);
  res.json({ id });
});

router.delete("/users", async (req, res) => {
  const { listId } = req.params;

  const res = listId.map(async (id) => await auth.deleteUser(id));
  res.json({ res });
});

module.exports = router;
