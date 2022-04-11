const PersonaModel = require("../models/persona");


const mostrar = async ()=> {
  const persona = await PersonaModel.find()
  console.log(persona)
};
//mostrar()
module.exports = mostrar
 