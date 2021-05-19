const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  imageurl: String,
  name: String,
  description: String,
  price: Number,
  deposit: Number,
  email: String,
  user: String,
  address: String,
  userId: String,
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;

