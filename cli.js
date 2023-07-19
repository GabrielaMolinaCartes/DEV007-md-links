import { mdLinks } from "./index.js";

mdLinks('/noexiste.md').then(() => {

}).catch((error) => {
    console.log(error)
});
