import chalk from 'chalk';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { mdLinks } from './index.js';

// Obtener argumento ingresado en la línea de comandos
const path = process.argv[2];
// Muestra la ruta recibida
console.log(chalk.magenta('Route received:', path));

mdLinks(path)
    // Se ejecutará cuando se resuelva con éxito
    .then((res) => {
        if(typeof res === 'string') {
            console.log(chalk.green.bold(res));
        } else {
            // Enlaces encontrados 
            console.log(chalk.green.bold('.md file(s) found:\n'));
            console.log(chalk.yellow.bold('Link(s) found:\n'));
            // Muestra los objetos de enlace en la terminal
            console.log(res);
        }
})
.catch((error) => {
    // Muestra mensaje de error si no se ejecuta correctamente
    console.log(chalk.red.bold(error.message));
});
