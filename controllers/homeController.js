const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const leerUrls = async(req, res) => {
  try {
    const urls = await Url.find().lean()
    res.render("home", {urls})
  } catch (error) {
    console.log(error);
    res.send("Algo falló")
  }
};

const agregarUrl = async(req, res) =>{
  const {origin} = req.body;
  try {
    const url = new Url({origin, shortUrl:nanoid(8)});
    await url.save();
    res.redirect("/")
  } catch (error) {
    console.log(error);
    res.send("Algo falló")
  }
};

module.exports = {
  leerUrls,
  agregarUrl,
}