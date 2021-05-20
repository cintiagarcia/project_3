const router = require("express").Router();
const Equipment = require("../models/Equipment.js");
const { uploader, cloudinary } = require("../config/cloudinary");

router.post("/", (req, res, next) => {
  const {
    name,
    img,
    description,
    price,
    deposit,
    email,
    user,
    address,
    userId,
  } = req.body;
  // var imgPath = getSafe(() => req.file.path, "");
  console.log(`>>>>>${img}`);
  Equipment.create({
    imageurl: img,
    name,
    description,
    price,
    deposit,
    email,
    user,
    address,
    userId,
  })
    .then((equipment) => {
      console.log("all good");
      console.log(equipment);
      res.status(201).json(equipment);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
   console.log(`>>>>> file is: , ${req.file}`)
   console.log(req.file)
  
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ img: req.file.path });
});

function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

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

router.get("/filter/:address", function (req, res) {
  var equipment = req.params.address,
    console.log("estoy aqui!")
    console.log(req.params.address);
});




router.put("/:id", (req, res, next) => {
  const {
    imageUrl,
    name,
    description,
    price,
    deposit,
    email,
    user,
    address,
    userId,
  } = req.body;
  console.log("router.put", id);
  Equipment.findByIdAndUpdate(
    req.params.id,
    {
      imageUrl,
      name,
      description,
      price,
      deposit,
      email,
      user,
      address,
      userId,
    },
    // if the return value of the mongoose should be the updated document you need to add this
    { new: true }
  )
    .then((equipment) => {
      res.status(200).json(equipment);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  Equipment.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).json({ message: "equipment deleted" });
  });
});

module.exports = router;
