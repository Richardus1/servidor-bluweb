console.log("Soy el frontend");

document.addEventListener("click", e =>{
  if(e.target.dataset.short){
    navigator.clipboard
    const url = `${window.location.origin}/${e.target.dataset.short}`;//envia al origen...
    //https://developer.mozilla.org/es/docs/web/api/location/origin

    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Copiado al portapapeles")
      }).catch((err) => {
         console.log("Algo salió mal...", err)
      });
  } 
})