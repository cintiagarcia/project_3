const router = require("express").Router();
const Equipment = require("../models/Equipment.js");

router.post("/", (req, res, next) => {
  const { name, description, price, deposit } = req.body;

  Equipment.create({
    name,
    description,
    price,
    deposit,
  })
    .then((equipment) => {
      res.status(201).json(equipment);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/", (req, res, next) => {
  console.log("router.get");
  Equipment.find()
    .then((equipments) => {
      res.status(200).json(equipments);
    })
    .catch((err) => res.json(err));
});

router.get("/:id", (req, res, next) => {
  console.log(">>>>>>>> router.getID ${req.params.id}");
  Equipment.findById(req.params.id).then((equipment) => {
    if (!equipment) {
      res.status(404).json(equipment);
    } else {
      res.status(200).json(equipment);
    }
  });
});

router.put("/:id", (req, res, next) => {
  const { name, description, price, deposit } = req.body;
  console.log("router.put", id);
  Equipment.findByIdAndUpdate(
    req.params.id,
    { name, description, price, deposit },
    // if the return value of the mongoose should be the updated document you need to add this
    { new: true }
  )
    .then((equipment) => {
      res.status(200).json(equipment);
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  Equipment.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ message: "equipment deleted" });
  });
});

module.exports = router;
