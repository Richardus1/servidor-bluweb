//crear
const crear = async ()=> {
  const persona = new PersonaModel({
    nombre: "Fer",
    edad: 20,
    pais: "Canada"
  })
  const resultado = await persona.save()
  console.log(resultado)
};
//crear()