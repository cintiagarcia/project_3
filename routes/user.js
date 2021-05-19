const router = require("express").Router();
const Equipment = require("../models/User.js");

router.get("/:id", (req, res, next) => {
  console.log(">>>>>>>> router.getID ${req.params.id}");
  User.findById(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json(equipment);
    } else {
      res.status(200).json(equipment);
    }
  });
});
