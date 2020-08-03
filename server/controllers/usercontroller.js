const router = require("express").Router();
const User = require("../db").import("../models/user");
const Logg = require("../db").import("../models/log");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");

//User Signup

router.post("/user", function (req, res) {
  User.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        user: user,
        message: "User succesfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//user login

router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });

            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Create Log (good)
router.post("/log/", validateSession, (req, res) => {
  const logg = {
    description: req.body.logg.description,
    definition: req.body.logg.definition,
    result: req.body.logg.result,
    owner: req.user.id,
  };
  Logg.create(logg)
    .then((logg) => res.status(200).json(logg))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET ALL ENTRIES (good)
router.get("/log", (req, res) => {
  Logg.findAll()
    .then((logg) => res.status(200).json(logg))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET ENTRIES BY USER
router.get("/log/:id", validateSession, (req, res) => {
  let id = req.params.id;
  Logg.findAll({
    where: { owner: id },
  })
    .then((logg) => res.status(200).json(logg))
    .catch((err) => res.status(500).json({ error: err }));
});

//UPDATING ENTRY// PUT METHOD
router.put("/log/:id", validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.logg.description,
    definition: req.body.logg.definition,
    result: req.body.logg.result,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } };

  Logg.update(updateLogEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

//DELETE - DELETING A JOURNAL ENTRY
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Logg.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
