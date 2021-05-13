const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  deposit: Number,
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;

