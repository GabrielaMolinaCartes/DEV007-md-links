

Object.defineProperty(exports, "__esModule", {
  value: true
});
const _mdLinks = void 0;
export { _mdLinks as mdLinks };
const _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { 
  return obj && obj.__esModule ? obj : { "default": obj }; }
const mdLinks = function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (_fs.default.existsSync(path)) {
      // Chequear y convertir a una ruta absoluta.
      // Es un archivo o un directorio.
    } else {
      // Si la ruta no existe rechaza la promesa.
      reject('La ruta no existe');
    }
  });
};
const _mdLinks = mdLinks;
export { _mdLinks as mdLinks };
