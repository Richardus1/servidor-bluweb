const { config } = require("dotenv");
const mongoose = require("mongoose");
require("dotenv").config();

const clienteDb = mongoose.connect(process.env.URI)
  .then((m) => {
    console.log("DB conectada 👌")
    return m.connection.getClient()
  })
  .catch((e) => console.log("Error de conección a DB " + e));

module.exports = clienteDb



