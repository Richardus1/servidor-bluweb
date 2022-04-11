const mongoose = require("mongoose");

/* const dbuser = "nuevo";
const password = "Az1LVqpJOanxrtiG";
const dbname = "chatbotRikkoDb"; */
//const URI = `mongodb://localhost/NuevoDB`;

mongoose.connect(process.env.URI)
  .then(() => console.log("DB conectada 👌"))
  .catch((e) => console.log("Error de conección a DB " + e))



