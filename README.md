# Markdown Links

## Índice

* [1. Introducción](#1-introducción)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Diagrama de flujo](#3-diagrama-de-flujo)
* [4. Documentación técnica de la librería](#4-documentación-técnica-de-la-librería)
* [5. Instalación y Guía de uso](#5-instalación-y-guía-de-uso)
* [6. Pruebas unitarias](#6-pruebas-unitarias)
* [7. Checklist](#7-checklist)
* [8. Board](#8-board)

***

## 1. Introducción

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Resumen del proyecto

MdLinks es una herramienta de línea de comandos desarrollada en Node.js que permite analizar archivos Markdown y extraer información sobre los enlaces presentes en ellos. Se caracteriza por:

*Entregar información detallada, verificando la válidez de cada enlace de los archivos Markdown y proporcionando detalles como el texto, la URL y el estado (ok o fail) de cada enlace encontrado.

*Analizar rápidamente los archivos Markdown y obtener información sobre los enlaces sin tener que hacerlo manualmente.

## 3. Diagrama de flujo


## 4. Documentación técnica de la librería

### 1) JavaScript API

El módulo puede importarse en otros scripts de Node.js y ofrece la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, se resuelver como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto **únicamente** con la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función **retorna una promesa** (`Promise`) que **resuelve a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación puede ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

#### Options

##### `--validate` o `--v`

Si pasamos la opción `--validate` o `--v`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideramos el link como ok.

##### `--stats` o `--s`

Si pasamos la opción `--stats` o `--s` el output (salida) es un texto con estadísticas
básicas sobre los links. Como por ejemplo:

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación. Como por ejemplo:

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 5. Instalación y Guía de uso

## 6. Pruebas unitarias

## 7. Checklist

### General

* [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [ ] Un board con el backlog para la implementación de la librería.
* [x] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios
* [x] Implementa `options.validate`

### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [x] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [ ] Pasa tests (y linters) (`npm test`).

## 8. Board
