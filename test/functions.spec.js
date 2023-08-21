// Importar la función y el módulo fs
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/named
import { 
  routeExist, 
  absoluteRoute, 
  isAFile, 
  isADirectory, 
  isMdFile,
  readMdFile,
  getMdFilesRecursion
// eslint-disable-next-line import/named
} from '../src/functions';


// Mockear fs.existsSync para simular su comportamiento
jest.mock('fs');

// Test de Fn routeExist
describe('routeExist', () => {
  it('debería devolver true cuando la ruta existe', () => {
    // Simular que fs.existsSync devuelve true
    fs.existsSync.mockReturnValue(true);
    // Ruta de prueba
    const rutaArchivo = '/ruta/de/prueba/archivo.txt';
    // Llamar a la función y verificar el resultado
    const resultado = routeExist(rutaArchivo);
    expect(resultado).toBe(true);
  });
  it('debería devolver false cuando la ruta no existe', () => {
    // Simular que fs.existsSync devuelve false
    fs.existsSync.mockReturnValue(false);
    // Ruta de prueba
    const rutaArchivo = '/ruta/de/prueba/archivo.txt';
    // Llamar a la función y verificar el resultado
    const resultado = routeExist(rutaArchivo);
    expect(resultado).toBe(false);
  });
});

// Test de fn absoluteRoute
describe('absoluteRoute', () => {
  it('debería devolver true cuando la ruta es absoluta', () => {
    // Ruta absoluta de prueba
    const rutaAbsoluta = '/ruta/absoluta/de/prueba/archivo.txt';
    // Simular el comportamiento de path.isAbsolute para devolver true
    path.isAbsolute = jest.fn().mockReturnValue(true);
    // Llamar a la función y verificar el resultado
    const resultado = absoluteRoute(rutaAbsoluta);
    expect(resultado).toBe(true);
  });
  it('debería devolver false cuando la ruta no es absoluta', () => {
    // Ruta relativa de prueba
    const rutaRelativa = 'ruta/relativa/de/prueba/archivo.txt';
    // Simular el comportamiento de path.isAbsolute para devolver false
    path.isAbsolute = jest.fn().mockReturnValue(false);
    // Llamar a la función y verificar el resultado
    const resultado = absoluteRoute(rutaRelativa);
    expect(resultado).toBe(false);
  });
});

// Test de fn isAFile
describe('isAFile', () => {
  // eslint-disable-next-line max-len
  it('debería devolver información sobre el archivo cuando la ruta es válida', () => {
    // Ruta de archivo de prueba
    const rutaArchivo = '/ruta/de/prueba/archivo.txt';
    // eslint-disable-next-line max-len
    // Simular el comportamiento de fs.statSync para devolver información ficticia
    fs.statSync = jest.fn().mockReturnValue({
      isFile: () => true,  // Simulamos que es un archivo
    });
    // Llamar a la función y verificar el resultado
    const resultado = isAFile(rutaArchivo);
    expect(resultado.isFile()).toBe(true);
  });
  it('debería lanzar una excepción cuando la ruta no es válida', () => {
    // Ruta de prueba inválida (no existe en este caso)
    const rutaInvalida = '/ruta/no/existente/archivo.txt';
    // Simular el comportamiento de fs.statSync para lanzar una excepción
    fs.statSync = jest.fn(() => {
      throw new Error('No se puede acceder a la ruta');
    });
    // Llamar a la función y verificar si lanza una excepción
    expect(() => {
      isAFile(rutaInvalida);
    }).toThrowError('No se puede acceder a la ruta');
  });
});

// Test de Fn isADirectory
describe('isADirectory', () => {
  it('debería devolver true cuando la ruta es un directorio', () => {
    // Ruta de directorio de prueba
    const rutaDirectorio = '/ruta/de/prueba/directorio';
    // eslint-disable-next-line max-len
    // Simular el comportamiento de fs.statSync para devolver información ficticia
    fs.statSync = jest.fn().mockReturnValue({
      isDirectory: () => true,  // Simulamos que es un directorio
    });
    // Llamar a la función y verificar el resultado
    const resultado = isADirectory(rutaDirectorio);
    expect(resultado).toBe(true);
  });
  it('debería devolver false cuando la ruta no es un directorio', () => {
    // Ruta de archivo de prueba
    const rutaArchivo = '/ruta/de/prueba/archivo.txt';
    // eslint-disable-next-line max-len
    // Simular el comportamiento de fs.statSync para devolver información ficticia
    fs.statSync = jest.fn().mockReturnValue({
      isDirectory: () => false,  // Simulamos que no es un directorio
    });
    // Llamar a la función y verificar el resultado
    const resultado = isADirectory(rutaArchivo);
    expect(resultado).toBe(false);
  });
  it('debería lanzar una excepción cuando la ruta no es válida', () => {
    // Ruta de prueba inválida (no existe en este caso)
    const rutaInvalida = '/ruta/no/existente/directorio';
    // Simular el comportamiento de fs.statSync para lanzar una excepción
    fs.statSync = jest.fn(() => {
      throw new Error('No se puede acceder a la ruta');
    });
    // Llamar a la función y verificar si lanza una excepción
    expect(() => {
      isADirectory(rutaInvalida);
    }).toThrowError('No se puede acceder a la ruta');
  });
});

// Test de Fn isMdFile
describe('isMdFile', () => {
  // eslint-disable-next-line max-len
  it('debería devolver true cuando la ruta es un archivo con extensión .md', () => {
    // Ruta de archivo con extensión .md de prueba
    const rutaArchivoMd = '/ruta/de/prueba/archivo.md';
    // Llamar a la función y verificar el resultado
    const resultado = isMdFile(rutaArchivoMd);
    expect(resultado).toBe('.md');
  });
  // eslint-disable-next-line max-len
  it('debería devolver la extensión del archivo cuando la ruta es válida pero no tiene extensión .md', () => {
    // Ruta de archivo con extensión diferente de prueba
    const rutaArchivoOtro = '/ruta/de/prueba/archivo.txt';
    // Llamar a la función y verificar el resultado
    const resultado = isMdFile(rutaArchivoOtro);
    expect(resultado).toBe('.txt');
  });
  it('debería lanzar una excepción cuando la ruta no es válida', () => {
    // Ruta de prueba inválida (no existe en este caso)
    const rutaInvalida = '/ruta/no/existente/archivo.md';
    // Simular el comportamiento de path.extname para lanzar una excepción
    path.extname = jest.fn(() => {
      throw new Error('No se puede acceder a la ruta');
    });
    // Llamar a la función y verificar si lanza una excepción
    expect(() => {
      isMdFile(rutaInvalida);
    }).toThrowError('No se puede acceder a la ruta');
  });
});


// Test de Fn readMdFile
describe('readMdFile', () => {
  // eslint-disable-next-line max-len
  it('debería leer un archivo Markdown y extraer los enlaces correctamente', () => {
    // Ruta de archivo Markdown de prueba
    const rutaArchivoMd = '/ruta/de/prueba/archivo.md';
    // Contenido ficticio del archivo Markdown
    const contenidoMd = `
      Este es un [enlace 1](enlace1.md) 
    `;
    // eslint-disable-next-line max-len
    // Simular el comportamiento de fs.readFileSync para devolver el contenido ficticio
    fs.readFileSync = jest.fn().mockReturnValue(contenidoMd);
    // Llamar a la función y verificar el resultado
    const resultado = readMdFile(rutaArchivoMd);
    expect(resultado).toEqual([
      {
        text: 'enlace 1',
        href: 'enlace1.md',
        file: path.resolve(rutaArchivoMd),
      },
    ]);
  });
});

// Test de Fn getMdFilesRecursion
describe('getMdFilesRecursion', () => {
  // eslint-disable-next-line max-len
  it('debería obtener una lista de archivos Markdown (.md) de manera recursiva', () => {
    // Directorio de prueba
    const directorioPrueba = '/ruta/de/prueba';
    // Contenido ficticio de archivos y subdirectorios
    const contenidoDirectorio = {
      archivos: ['archivo1.md'],
      subdirectorios: ['archivo2.md']  
    };
    // Simular el comportamiento de fs.readdirSync y fs.statSync
    fs.readdirSync = jest.fn((dir) => contenidoDirectorio[dir] || []);
    fs.statSync = jest.fn((ruta) => ({
      isFile: () => contenidoDirectorio.archivos.includes(path.basename(ruta)),
      // eslint-disable-next-line max-len
      isDirectory: () => contenidoDirectorio.subdirectorios.includes(path.basename(ruta)),
    }));
    // Llamar a la función y verificar el resultado
    const resultado = getMdFilesRecursion(directorioPrueba);
    expect(resultado).toContain([
      '/ruta/de/prueba/archivo1.md',
      '/ruta/de/prueba/subdirectorios/archivo2.md',
    ]);
  });
});