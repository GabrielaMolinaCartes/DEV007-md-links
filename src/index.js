import path from 'path';
import chalk from 'chalk';
import { 
  routeExist, 
  absoluteRoute, 
  isAFile, 
  isDirectory, 
  isMdFile, 
  readMdFile, 
  getMdFilesRecursion 
// eslint-disable-next-line import/extensions
} from './functions.js';

export const mdLinks = (pathUser) => new Promise((resolve, reject) => {
  if (!routeExist(pathUser)) {
    // Rechazamos la promesa si la ruta no existe
    reject(new Error('Error, enter a valid path'));
  }
  if(!absoluteRoute(pathUser)) {
    // Resolvemos la promesa si la ruta no es absoluta usando path.resolve
    resolve(`Absolute path: ${path.resolve(pathUser)}`);
  }
  if (isDirectory(pathUser)) {
    // Obtenemos los archivos .md de todos los directorios
    const mdFiles = getMdFilesRecursion(pathUser);
    // Mapeamos los archivos .md obtenidos en un array, llamando a mdLinks para cada uno de ellos
    const mapFiles = mdFiles.map((file) => mdLinks(file));
    // Resolvemos todas las promesas
    Promise.all(mapFiles)
    // Concatenamos todo en un array de links
    .then((results) => results.flat())
    // Filtramos links indefinidos antes de rolver la promesa
    .then((links) => {
      resolve(links.filter((link) => link.href));
    })
    // Rechazamos la promesa si hay algún error
    .catch((error) => reject(error));
    // Lee los links si es un archivo .md
  } else if (isAFile(pathUser).isFile() && isMdFile(pathUser) === '.md') {
    // Mapeamos cada objeto del array devuelto 
    const links = readMdFile(pathUser).map((link) => ({
      href: link.url,
      text: link.text,
      file: path.resolve(pathUser),
    }));
    // Resolvemos la promesa con un mensaje si el archivo .md no contine links
    if (links.length === 0) {
      resolve(chalk.magenta('Empty .md file, links not found'));
    } else {
      // Resolvemos la promesa si el archivo .md contiene links
      resolve(links);
    } 
  } else {
  // Rechazamos la promesa con mensaje de error si no es archivo .md o directorio
  reject(new Error(chalk.red('Error, not a .md file')));
  }
});

export default mdLinks;