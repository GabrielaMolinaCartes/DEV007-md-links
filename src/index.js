import path from 'path';
import { 
  routeExist, 
  absoluteRoute, 
  isAFile, 
  isADirectory, 
  isMdFile, 
  readMdFile, 
  getMdFilesRecursion,
  validateFn,
  statsFn 
// eslint-disable-next-line import/extensions, import/named
} from './functions.js';

// Función que procesa links y options 
const processFn = (links, { validate, stats }) => {
  // Si elige validate(true)
  if (validate) {
    // Valida cada enlace 
    return Promise.all(links.map((link) => validateFn(link)))
      .then((validateLinks) => {
        // Si también se elige la opción stats(true)
        if (stats) {
          // Calcula stats de los enlaces validados
          const calculateStats = statsFn(validateLinks);
          // Añade al resultado el número de enlaces únicos
          calculateStats.uniqueLinks = calculateStats.uniqueLinksArray.length;
          return calculateStats;
        }
        // Si solo se solicito validate devuelve los enlaces validados
        return validateLinks;
      });
  }
  // Si elige stats(true)
  if (stats) {
    // Calcula stats de los enlaces
    const calculateStats = statsFn(links);
    // Añade al resultado el número de enlaces únicos
    calculateStats.uniqueLinks = calculateStats.uniqueLinksArray.length;
    // Resuelve la promesa con el resultado de las stats
    return Promise.resolve(calculateStats);
  }
  // Si no se solicito ni validate ni stats, devuelve los enlaces originales
  return Promise.resolve(links);
};

// Función principal mdLinks
export const mdLinks = (pathUser, { validate = false, stats = false } = {}) => new Promise((resolve, reject) => {
  // Verifica si la ruta existe
  if (!routeExist(pathUser)) {
    // Rechazamos la promesa si la ruta no existe
    reject(new Error('Error, enter a valid path'));
  }
  // Verifica si la ruta es absoluta
  if(!absoluteRoute(pathUser)) {
    // Resolvemos la promesa si la ruta no es absoluta 
    resolve(`Absolute path: ${path.resolve(pathUser)}`);
  }
  // Si la ruta es un directorio
  if (isADirectory(pathUser)) {
    // Obtenemos los archivos .md de todos los directorios
    const mdFiles = getMdFilesRecursion(pathUser);
    // Mapeamos los archivos .md obtenidos en un array, llamando a mdLinks para cada uno de ellos
    const mapFiles = mdFiles.map((file) => mdLinks(file, { validate }));
    // Resolvemos todas las promesas
    Promise.all(mapFiles)
    // Concatenamos todo en un array de links
    .then((results) => results.flat())
    .then((links) => processFn(links, { validate, stats }))
      .then(resolve)
      .catch(reject);
  } else if (isAFile(pathUser).isFile() && isMdFile(pathUser) === '.md') {
    // Si la ruta es un archivo y tiene extensión .md, lee los enlaces del archivo .md
    const links = readMdFile(pathUser);
    // Procesa los enlaces y devuelve una promesa con el resultado (puede ser validate o stats)
    processFn(links, { validate, stats })
      .then(resolve)
      .catch(reject);
  } else {
    // Si la ruta es un archivo pero no tiene extensión .md, se rechaza promesa con un error
    reject(new Error('Not .md file'));
  }
});

export default mdLinks;