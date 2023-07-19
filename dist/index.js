"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mdLinks = function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    //Identifica si la ruta existe.
    if (_fs["default"].existsSync(path)) {
      //Chequear y convertir a una ruta absoluta.
      //Es un archivo o un directorio.
    } else {
      //Si la ruta no existe rechaza la promesa.
      reject('La ruta no existe');
    }
  });
};
exports.mdLinks = mdLinks;
