// Carlos Eduardo Caravantes Reynoso
import fs from 'fs';

class FileManager {

    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    };


    get = async (limit) => {
        let data = fs.existsSync(this.path) ? JSON.parse(await fs.promises.readFile(this.path, { encoding: this.format })) : [];
        let l = data.length;

        if (l > 0) {
            data = data.filter((p) => p.status == true);
        }

        console.log(data);

        if (limit){
            const elements = l > limit ? data.slice(0, limit) : data;
            return elements;
        } else {
            return data;
        }
    };


    getById = async (id) => {
        const elements = await this.get();
        const element_found = elements.find(e => e.id === id);

        if (element_found) {
            console.log({ success: 'Producto encontrado' });
            return element_found;
        } else {
            let status = { error: 'Producto no encontrado' }
            console.log(status);
            return status;
        }
    };


    getNextId = async (list) => {
        return (list.length == 0) ? 1 : list[list.length - 1].id + 1;
    }


    set = async (data) => {

        try {
            const elements = await this.get();
            data.id = await this.getNextId(elements);
            elements.push(data);
            fs.promises.writeFile(this.path, JSON.stringify(elements));
            return {status: 'Producto Agregado Exitosamente'}
        } catch {
            return {status: 'ERROR al escribir el archivo'}
        }
    };



};

export default FileManager
//module.exports = ProductManager;