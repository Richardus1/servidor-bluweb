const mongoose = require("mongoose");

const personaSchema = mongoose.Schema({
  nombre: String,
  edad: Number,
  pais: String
},{versionKey: false});

const PersonaModel = mongoose.model("persona", personaSchema);
module.exports = PersonaModel





//llamando a los procedientos

