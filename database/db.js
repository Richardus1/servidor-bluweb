const mongoose = require("mongoose");

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB conectada 👌"))
  .catch(e => console.log("Error de coneccion a DB " + e))


