import fs from 'fs';
import path from 'path';

// Existe la ruta
export const routeExist = (route) => fs.existsSync(route);
// Convierte una ruta relativa en absoluta
export const absoluteRoute = (route) => path.isAbsolute(route);
// Es un archivo
export const isAFile = (route) => fs.statSync(route);
// Es un directorio
export const isADirectory = (route) => fs.statSync(route).isDirectory();
// Si es un archivo .md
export const isMdFile = (route) => path.extname(route);
// Lee el contenido de un archivo .md y extrae los links
export const readMdFile = (route) => {
  const includesFn = fs.readFileSync(route, 'utf8');
  const regexLink = /\[([^\]]+)\]\((.*)\)/gm;
  const equals = Array.from(includesFn.matchAll(regexLink));
  const links = equals.map((equal) => ({
    text: equal[1],
    url: equal[2],
  }));
  // console.log(readMdFile);
  return links;
};

// Obtener todos los archivos .md de un directorio y sus subdirectorios
export const getMdFilesRecursion = (dir) => {
  let mdFiles = [];

  // Leer los archivos y subdirectorios del directorio
  const files = fs.readdirSync(dir);
  // Para cada archivo o subdirectorio
  files.forEach((file) => {
    const fileRoute = path.join(dir, file);
    const stats = fs.statSync(fileRoute);

    // Si es un archivo .md, agregarlo al array "mdFiles"
    if (stats.isFile() && path.extname(fileRoute) === '.md') {
      mdFiles.push(fileRoute);
      // Si es un directorio, llamar recursivamente a la función para obtener archivos .md
    } else if (stats.isDirectory()) {
      const subDirMdFiles = getMdFilesRecursion(fileRoute);
      mdFiles = mdFiles.concat(subDirMdFiles);
    }
  });
  // Retornar el array con todos los archivos .md encontrados en el directorio
  return mdFiles;
};