import fs from 'fs';
import path from 'path';

const routeUser = process.argv[2];
const pathExists = (route) => fs.existsSync(route); 

const mdLinks = () => { 
  // Validar si la ruta existe
  if(pathExists(routeUser) === false) {
    console.log("Error, el archivo no existe");
    return;
  } 
  // Validar si la ruta es absoluta
  if (path.isAbsolute(routeUser) === false) {
    console.log('La ruta ya es absoluta'); 
    return;
  }
  console.log(path.resolve(routeUser)); 
}

mdLinks()


/* export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe.
    if(fs.existsSync(path)) {
    //Chequear o convertir a una ruta absoluta.
    //Es un archivo o un directorio.
    //Si es un directorio crea un array con archivos md
    //Si es un directorio vacío, retornar un error.
    //Si es un archivo 
    }else {
    //Si la ruta no existe rechaza la promesa.
    reject('La ruta no existe');
  }
  });
} */