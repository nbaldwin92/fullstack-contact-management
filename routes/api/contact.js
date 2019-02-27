const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const NewContact = require("../../models/NewContact");

router.post("/addcontact", (req, res) => {
  const newContact = new NewContact({
    addedBy: req.body.addedBy,
    contact: req.body.contact,
    date: req.body.date
  });

  newContact
    .save()
    .then(newContact => res.json("Saved to db"))
    .catch(err => console.log(err));
});

router.get("/getcontacts", (req, res) => {
  const { addedBy } = req.query;

  NewContact.find({ addedBy: addedBy }, (err, contacts) => {
    if (err) return handleError(err);
    res.json(contacts);
  });
});

router.delete("/removecontact", (req, res) => {
  const { id } = req.body;

  NewContact.deleteOne({ _id: id }, (err, removed) => {
    if (err) return handleError(err);
    res.json(removed);
  });
});

module.exports = router;
