import chalk from 'chalk';
// eslint-disable-next-line import/extensions, import/no-named-as-default, import/no-named-as-default-member
import mdLinks from './index.js';

// Obtener argumento ingresado en la línea de comandos
const path = process.argv[2];
const options = process.argv.slice(3);
// Muestra la ruta recibida
console.log(chalk.magenta('Route received:', path));

const validated = options.includes('--validate') || options.includes('--v');
const stated = options.includes('--stats') || options.includes('--s');

// Función mdLinks con ruta y opciones 
mdLinks(path, { validate: validated, stats: stated })
    // Se ejecutará cuando se resuelva con éxito mostrándose en verde y negrita
    .then((res) => {
        if(typeof res === 'string') {
            console.log(chalk.green.bold(res));
        // Opciones validate y stats
        } else  if(validated && stated) {
            const { totalLinks, uniqueLinks, brokenLinks } = res;
            // Enlaces encontrados 
            console.log(chalk.bgYellow('Validation and Stats:\n'));
            console.log(chalk.bgMagenta.italic(`Total links: ${totalLinks}`));
            console.log(chalk.bgMagenta.italic(`Unique links: ${uniqueLinks}`));
            console.log(chalk.bgMagenta.italic(`Broken links: ${brokenLinks}`));
         // Si sólo se validó   
        } else if(validated) {
                console.log(chalk.bgYellow('Validation:\n'));
                res.forEach((link) => {
                    const {
                        href, 
                        text, 
                        file, 
                        status,
                    } = link;
                    const ok = status >= 200 && status < 400 ? 'OK' : 'Fail';
        
                    console.log(chalk.bgCyan.italic(`href: ${href}`));
                    console.log(chalk.bgCyan.italic(`text: ${text}`));
                    console.log(chalk.bgCyan.italic(`file: ${file}`));
                    console.log(chalk.bgCyan.italic(`status: ${status}`));
                    console.log(chalk.bgCyan.italic(`ok: ${ok}\n`));
                });
             // Si sólo se ingresó la opción stats   
            } else if (stated) {
                const { totalLinks, uniqueLinks } = res;
                console.log(chalk.bgYellow('Stats:\n'));
                console.log(chalk.bgBlue.italic(`Total links: ${totalLinks}`));
                console.log(chalk.bgBlue.italic(`Unique links: ${uniqueLinks}`));
            } else {
            console.log(chalk.chalk.bgYellow('Link(s) found:\n'));
            // Muestra los objetos de enlace en la terminal
            console.log(res);
            }
})
.catch((error) => {
    // Muestra mensaje de error si no se ejecuta correctamente
    console.log(chalk.red.bold(error.message));
});
