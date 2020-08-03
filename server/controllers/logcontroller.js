// let express = require("express");
// let router = express.Router();
// let validateSession = require("../middleware/validate-session");
// const Logg = require("../db").import("../models/log");

// //Create
// //JOURNAL CREATE
// router.post("/log", validateSession, (req, res) => {
//   const logEntry = {
//     description: req.body.logg.description,
//     definition: req.body.logg.definition,
//     result: req.body.logg.result,
//     owner: req.user.id,
//   };
//   Logg.create(logEntry)
//     .then((logg) => res.status(200).json(logg))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// //GET ALL ENTRIES
// router.get("/", (req, res) => {
//   Journal.findAll()
//     .then((journals) => res.status(200).json(journals))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// //GET ENTRIES BY USER
// router.get("/mine", validateSession, (req, res) => {
//   let userid = req.user.id;
//   Logg.findAll({
//     where: { owner: userid },
//   })
//     .then((journals) => res.status(200).json(journals))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// //UPDATING ENTRY// PUT METHOD
// router.put("/update/:entryId", validateSession, function (req, res) {
//   const updateLoggEntry = {
//     description: req.body.logg.description,
//     definition: req.body.logg.definition,
//     result: req.body.logg.result,
//   };

//   const query = { where: { id: req.params.entryId, owner: req.user.id } };

//   Logg.update(updateLoggEntry, query)
//     .then((logg) => res.status(200).json(logg))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// //DELETE - DELETING A JOURNAL ENTRY
// router.delete("/delete/:id", validateSession, function (req, res) {
//   const query = { where: { id: req.params.id, owner: req.user.id } };

//   Logg.destroy(query)
//     .then(() => res.status(200).json({ message: "Workout Log Removed" }))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// module.exports = router;
