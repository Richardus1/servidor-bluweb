const formidable = require("formidable");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

module.exports.formPerfil = async (req, res)=>{

  try {
    const user = await User.findById(req.user.id);
    return res.render("perfil", {user: req.user, imagen: user.imagen})
  } catch (error) {
    req.flash("mensajes", [{msg: "Error al leer el usuario"}]);
    return res.redirect("/perfil")
  }
    
   
};

module.exports.editarFotoPerfil = async (req, res)=> {
  const form = new formidable.IncomingForm(); 
  form.maxFileSize = 50 * 1024 * 1024;//50 MB

  form.parse(req, async(err, fields, files)=> {
    try {
      if (err) {
        throw new Error("Falló la subida de la imagen")
      }
      console.log(fields);
      console.log(files);
      const file = files.myFile;
      
      if (file.originalFilename === "") {
        throw new Error("Agrega una imagen")
      };

     /* //reeemplazada por includes y la const imageTypes, arreglo para incluir muchos mimetypes
      if (!(file.mimetype === "image/jpeg" || "image/png")) {
        throw new Error("Debe ser Jpg o Png")
      } */

      const imageTypes = ["image/jpeg", "image/png"];
      if (!imageTypes.includes(file.mimetype)) {
        throw new Error("Debe ser Jpg o Png")
      };

      if (file.size > 50 * 1024 * 1024) {
        throw new Error("Menos de 50MG")
      };

      const extension = file.mimetype.split("/")[1];
      const dirFile = path.join(__dirname,`../public/imagenes/perfiles/${req.user.id}.${extension}`);
      console.log(dirFile);
      
     // fs.renameSync(file.filepath, dirFile); //guarda temporal y renameSync renombra la ruta a la nueva ruta
     //da error por ser particionrd diferentes

     
      const is = fs.createReadStream(file.filepath);
      const os = fs.createWriteStream(dirFile);

      
      is.pipe(os);
      is.on('end',function() {
        fs.unlinkSync(file.filepath);
      });

      const image = await Jimp.read(file.filepath);
      image.resize(200, 200).quality(90).writeAsync(dirFile);

      const user = await User.findById(req.user.id);
      user.imagen = `${req.user.id}.${extension}`;
      await user.save();

      req.flash("mensajes", [{msg: "Imagen subida con éxito"}]);
      return res.redirect("/perfil")
    } catch (error) {
      req.flash("mensajes", [{msg: error.message}]);
      return res.redirect("/perfil")
    }
  })
}