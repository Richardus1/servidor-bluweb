const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const leerUrls = async(req, res) => {
  //console.log(req.user); //viene de la session id y usuario
  try {
    const urls = await Url.find({user: req.user.id}).lean();
    return res.render("home", {urls})
  } catch (error) {
     // console.log(error);
     // return res.send("Algo falló")
      req.flash("mensajes", [{msg: error.message}]);
      return res.redirect("/")
  }
};

const agregarUrl = async(req, res) =>{
  const {origin} = req.body;
  try {
    const url = new Url({origin, shortUrl:nanoid(8), user: req.user.id});
    await url.save();
    req.flash("mensajes", [{msg: "Url agregada"}]);
    return res.redirect("/")
  } catch (error) {
      req.flash("mensajes", [{msg: error.message}]);
      return res.redirect("/")
  }
};

const eliminarUrl = async(req, res)=>{
  const {id} = req.params;
  try {
    //await Url.findByIdAndDelete(id);
    const url = await Url.findById(id);
    if (!url.user.equals(req.user.id)) {
      throw new Error("No es tu url ...")
    }
    await url.remove();
    req.flash("mensajes", [{msg: "Url eliminada"}]);
    return res.redirect("/")
  } catch (error) {
      req.flash("mensajes", [{msg: error.message}]);
      return res.redirect("/")
  }
};

const editarUrlForm = async (req, res)=>{
  const {id} = req.params;
  try {
    const url = await Url.findById(id).lean();
    if (!url.user.equals(req.user.id)) {
      throw new Error("No es tu url ...")
    } 
    return res.render("home", {url});
  } catch (error) {
      req.flash("mensajes", [{msg: error.message}]);
      return res.redirect("/")
  }
}

const editarUrl = async (req, res)=>{
  const {id} = req.params;
  const {origin} = req.body; 
  
  try {
    const url = await Url.findById(id);
    if (!url.user.equals(req.user.id)) {
      throw new Error("No es tu url ...")
    }

    await url.updateOne({origin});
    req.flash("mensajes", [{msg: "Url editada"}]);

    //await Url.findByIdAndUpdate(id, {origin:origin});
    res.redirect("/");
  } catch (error) {
      req.flash("mensajes", [{msg: error.message}]);
      return res.redirect("/")
  }
};

const redireccionamiento = async (req, res)=>{
  const {shortUrl} = req.params;
  //console.log(shortUrl);
  try {
    const urlDb = await Url.findOne({shortUrl});
     return res.redirect(urlDb.origin)
  } catch (error) {
      req.flash("mensajes", [{msg: "Url no configurada"}]);
      return res.redirect("/auth/login")
  }
};

module.exports = {
  leerUrls,
  agregarUrl,
  eliminarUrl,
  editarUrlForm,
  editarUrl,
  redireccionamiento

}