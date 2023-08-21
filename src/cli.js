import chalk from 'chalk';
// eslint-disable-next-line max-len
// eslint-disable-next-line import/extensions, import/no-named-as-default, import/no-named-as-default-member
import mdLinks from './index.js';

// Obtener argumento ingresado en la línea de comandos
const path = process.argv[2];
const options = process.argv.slice(3);
// Muestra la ruta recibida
// console.log(chalk.yellow('Route received:', path));

const validated = options.includes('--validate') || options.includes('--v');
const stated = options.includes('--stats') || options.includes('--s');

// Función mdLinks con ruta y opciones 
mdLinks(path, { validate: validated, stats: stated })
    // Se ejecutará cuando se resuelva con éxito 
    .then((res) => {
        if (res.length === 0) {
            throw new Error('No links found');
        } if (typeof res === 'string') {
            console.log(chalk.green.bold(res));
        // Opciones validate y stats
        } else  if (validated && stated) {
            const { totalLinks, uniqueLinks, brokenLinks } = res;
            // Enlaces encontrados 
            console.log(chalk.yellow.bold('Validation and Stats:\n'));
            // eslint-disable-next-line max-len
            console.log(chalk.magenta('*'), (chalk.magenta.italic(`Total links: ${totalLinks}`)));
            // eslint-disable-next-line max-len
            console.log(chalk.blue('*'), (chalk.blue.italic(`Unique links: ${uniqueLinks}`)));
            // eslint-disable-next-line max-len
            console.log(chalk.red('*'), (chalk.red.italic(`Broken links: ${brokenLinks}`)));
         // Si sólo se validó   
        } else if(validated) {
                console.log(chalk.yellow.bold('Validation:\n'));
                res.forEach((link) => {
                    const {
                        text,
                        href,  
                        file, 
                        status,
                    } = link;
                    const ok = status >= 200 && status < 400 ? 'OK' : 'Fail';
                    console.log(chalk.yellowBright(' - - - - - - '));
                    console.log(chalk.cyan.italic(`text: ${text}`));
                    console.log(chalk.cyan.italic(`href: ${href}`));
                    console.log(chalk.cyan.italic(`file: ${file}`));
                    console.log(chalk.cyan.italic(`status: ${status}`));
                    console.log(chalk.cyan.italic(`ok: ${ok}\n`));
                });
             // Si sólo se ingresó la opción stats   
            } else if (stated) {
                const { totalLinks, uniqueLinks } = res;
                console.log(chalk.yellow('Stats:\n'));
                // eslint-disable-next-line max-len
                console.log(chalk.magenta('*'), (chalk.magenta.italic(`Total links: ${totalLinks}`)));
                // eslint-disable-next-line max-len
                console.log(chalk.blue('*'), (chalk.blue.italic(`Unique links: ${uniqueLinks}`)));
            } else {
            console.log(chalk.yellow.bold('Link(s) found:\n'));
            // Muestra los objetos de enlace en la terminal
            console.log(res);
            }
})
.catch((error) => {
    // Muestra mensaje de error si no se ejecuta correctamente
    console.log(chalk.red.bold(error.message));
});
